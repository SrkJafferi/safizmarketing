"use client";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import type { PropertyUnit } from "@/types/marketplace";
import { filterCurrentInventory, inventoryCounts, type InventoryFilters } from "@/lib/listings";
import { CurrentInventoryCard } from "./current-inventory-card";
import { HomeSearchField } from "./home-search-field";
import styles from "./current-inventory.module.css";

const PAGE_SIZE = 8;
const defaults: InventoryFilters = {purpose: "all", inventorySource: "all", type: "all", floor: "all", bedrooms: "all", sort: "default"};
export function CurrentInventory({units}: {units: PropertyUnit[]}) {
    const [filters, setFilters] = useState(defaults);
    const [limit, setLimit] = useState(PAGE_SIZE);
    const counts = inventoryCounts(units);
    const shown = filterCurrentInventory(units, filters);
    const change = (key: keyof InventoryFilters, value: string) => {
        setFilters(old => ({...old, [key]: value, ...(key === "purpose" ? {inventorySource: "all", sort: "default"} : {})})); setLimit(PAGE_SIZE);
    };
    const field = (label: string, key: keyof InventoryFilters, options: {value: string; label: string}[]) => <HomeSearchField label={label} name={`inventory-${key}`} className={styles.field} options={options} value={filters[key]} onValueChange={value=>change(key,value)} />;
    const purposeTabs = [{value: "all", label: "All", count: counts.all}, {value: "sale", label: "For Sale", count: counts.sale}, {value: "rent", label: "For Rent", count: counts.rent}];
    return <section className={styles.section} id="inventory" aria-labelledby="current-inventory-heading"><div className="rh-container">
        <div className={styles.head}><div><p className={styles.eyebrow}>Current Inventory</p><h2 id="current-inventory-heading">Explore Available<br/><em>Rahat Heights Units.</em></h2></div><p>Browse currently listed sale and rental opportunities at Rahat Heights through SAFIZMARKETING.</p></div>
        <div className={styles.tabs} aria-label="Inventory purpose">{purposeTabs.map(tab=><button key={tab.value} type="button" aria-pressed={filters.purpose===tab.value} onClick={()=>change("purpose",tab.value)}>{tab.label}<span>{tab.count}</span></button>)}</div>
        {filters.purpose==="sale" && counts.developer>0 && counts.resale>0 && <div className={styles.subTabs} aria-label="Sale inventory source">{[{value:"all",label:"All Sale",count:counts.sale},{value:"developer",label:"Developer",count:counts.developer},{value:"resale",label:"Resale",count:counts.resale}].map(tab=><button type="button" key={tab.value} aria-pressed={filters.inventorySource===tab.value} onClick={()=>change("inventorySource",tab.value)}>{tab.label} ({tab.count})</button>)}</div>}
        <div className={styles.controls}>
            {field("Property Type","type",[{value:"all",label:"All Types"},...Array.from(new Set(units.map(u=>u.type))).map(value=>({value,label:value==="shop"?"Shops":"Apartments"}))])}
            {field("Floor","floor",[{value:"all",label:"All Floors"},...Array.from(new Set(units.map(u=>u.floor))).map(value=>({value,label:`${value} Floor`}))])}
            {field("Bedrooms","bedrooms",[{value:"all",label:"Any Bedrooms"},...Array.from(new Set(units.filter(u=>u.bedrooms).map(u=>u.bedrooms!))).map(value=>({value:String(value),label:`${value} Bedrooms`}))])}
            {field("Sort by","sort",[{value:"default",label:"Unit Order"},...(filters.purpose!=="all"?[{value:"price-asc",label:"Price: Low to High"},{value:"price-desc",label:"Price: High to Low"}]:[]),{value:"size-asc",label:"Size: Low to High"},{value:"size-desc",label:"Size: High to Low"}])}
        </div>
        <div className={styles.summary}><p aria-live="polite">{shown.length} current {shown.length===1?"listing":"listings"}</p><button type="button" onClick={()=>{setFilters(defaults);setLimit(PAGE_SIZE);}}>Reset filters</button></div>
        <div className={styles.cards}>{shown.slice(0,limit).map(unit=><CurrentInventoryCard key={unit.id} unit={unit} purpose={filters.purpose}/>)}</div>
        {!shown.length&&<p className={styles.empty}>No current listings match these filters.</p>}
        {shown.length>limit&&<button className={styles.more} type="button" onClick={()=>setLimit(old=>old+PAGE_SIZE)}>Show More Units<ArrowRight size={15}/></button>}
        <p className={styles.note}>Prices and availability are based on the latest information supplied by the property owner/developer and may change. Contact SAFIZMARKETING for current details.</p>
    </div></section>;
}
