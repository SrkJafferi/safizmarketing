"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Check, ChevronDown } from "lucide-react";

export function HomeSearchField({ label, name, options, value: controlledValue, initialValue, onValueChange, className = "rh-search-field", hideLabel = false }: {
    label: string;
    name: string;
    options: { value: string; label: string }[];
    value?: string;
    initialValue?: string;
    onValueChange?: (value: string) => void;
    className?: string;
    hideLabel?: boolean;
}) {
    const id = useId();
    const field = useRef<HTMLDivElement>(null);
    const trigger = useRef<HTMLButtonElement>(null);
    const typing = useRef({ text: "", time: 0 });
    const [internalValue, setValue] = useState(initialValue ?? options[0].value);
    const value = controlledValue ?? internalValue;
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const selected = options.findIndex((option) => option.value === value);

    useEffect(() => {
        if (!open) return;
        function dismiss(event: PointerEvent) {
            if (!field.current?.contains(event.target as Node)) setOpen(false);
        }
        document.addEventListener("pointerdown", dismiss);
        return () => document.removeEventListener("pointerdown", dismiss);
    }, [open]);

    function show(index = selected) {
        setActive(index);
        setOpen(true);
        typing.current.text = "";
    }

    function choose(index: number) {
        if (controlledValue === undefined) setValue(options[index].value);
        setOpen(false);
        trigger.current?.focus();
        onValueChange?.(options[index].value);
    }

    function handleKey(event: KeyboardEvent<HTMLButtonElement>) {
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            if (!open) show();
            else setActive((current) => (current + (event.key === "ArrowDown" ? 1 : -1) + options.length) % options.length);
        } else if (event.key === "Home" || event.key === "End") {
            event.preventDefault();
            show(event.key === "Home" ? 0 : options.length - 1);
        } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (open) choose(active);
            else show();
        } else if (event.key === "Escape") {
            if (open) event.preventDefault();
            setOpen(false);
        } else if (event.key === "Tab") {
            setOpen(false);
        } else if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            const now = Date.now();
            const text = (now - typing.current.time < 600 ? typing.current.text : "") + event.key.toLowerCase();
            typing.current = { text, time: now };
            const match = options.findIndex((option) => option.label.toLowerCase().startsWith(text));
            if (match !== -1) {
                setActive(match);
                setOpen(true);
            }
        }
    }

    return (
        <div className={`${className}${open ? " is-open" : ""}`} ref={field}
            onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
            }}>
            <span id={`${id}-label`} className={hideLabel ? "sr-only" : undefined}>{label}</span>
            <input type="hidden" name={name} value={value} />
            <button ref={trigger} type="button" className="rh-select-trigger"
                role="combobox" aria-labelledby={`${id}-label`} aria-haspopup="listbox"
                aria-expanded={open} aria-controls={open ? `${id}-menu` : undefined}
                aria-activedescendant={open ? `${id}-option-${active}` : undefined}
                onClick={() => open ? setOpen(false) : show()} onKeyDown={handleKey}>
                <span>{options[selected].label}</span>
                <ChevronDown size={14} aria-hidden="true" />
            </button>
            {open && <ul id={`${id}-menu`} className="rh-select-menu" role="listbox"
                aria-labelledby={`${id}-label`} data-lenis-prevent>
                {options.map((option, index) => (
                    <li id={`${id}-option-${index}`} key={option.value} role="option"
                        aria-selected={index === selected}
                        className={index === active ? "is-active" : undefined}
                        onPointerMove={() => setActive(index)}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => choose(index)}>
                        <span>{option.label}</span>
                        {index === selected && <Check size={15} aria-hidden="true" />}
                    </li>
                ))}
            </ul>}
        </div>
    );
}
