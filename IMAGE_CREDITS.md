# Current marketplace assets

Project covers, galleries, floor plans and location material in `public/projects/` are derived from the supplied Rahat Associates brochures. No stock villas or generated project representations are used in project or unit cards. Exterior renders and illustrative interiors remain labelled as developer concepts. The Islamabad editorial image comes from the Faisal Mosque photograph in the supplied Rahat Heights brochure. Original high-resolution render files and unit photography remain replacement points.

- Smart One Heights 2: `reference/Smart One Hight re size (1).pdf`
- Rahat Heights: `reference/Brochure.pdf`
- Rahat Heights II: `reference/Brochure RH2 PLOT # 11 final.pdf`
- Rahat Associates logo: the developer's supplied 2025 financial plan
- SAFIZMARKETING: `reference/logo.avif`, copied unchanged to `public/brand/safizmarketing-official.avif`

Developer PDF originals are copied without alteration to `public/documents/`. Approved supplied banners, logos, QR artwork and sharing artwork are published under `public/banners/`, `public/brand/` and `public/images/og/`. The stock photographs documented below are editorial imagery for generic interiors and supporting sections; they do not represent individual Rahat listings.

# Image credits and replacement guide

## Read this first

**The stock photographs listed below are editorial imagery.** None of them shows a
property that SAFIZMARKETING is currently offering. They illustrate a _type_ of
property, a finish standard and a general Islamabad setting so the layout can be
reviewed as a finished design. The site itself says so wherever imagery could
otherwise be mistaken for a specific listing — on the property gallery, on the
featured story section, and in the Terms & Conditions.

The approved branded Open Graph image in `public/images/og/` is separate from this stock photography manifest.

---

## Licence

All placeholder photography is sourced from [Unsplash](https://unsplash.com) and
used under the [Unsplash License](https://unsplash.com/license): free to use for
commercial and non-commercial purposes, no permission or attribution required.

Attribution is therefore not legally required and **none is displayed on the
site**. It is recorded here so the provenance of every file is traceable and so
each image can be re-downloaded or swapped deliberately.

The stock files were downloaded during initial asset preparation with one
consistent, light colour grade — saturation pulled to 93%, brightness to 101%, a
slight contrast lift — so the photographs read as a single coherent set beneath
the navy-and-gold palette.

The one-off download utility has been removed from the release. The source IDs below retain the provenance of the published files.

---

## Manifest

`photo-<id>` in the table below is the Unsplash photo path segment. The full
source URL for any row is
`https://images.unsplash.com/photo-<id>?w=<width>&q=90&fm=jpg&fit=max`.

### Hero and large cinematic plates

| File                      | Unsplash ID                  | Subject                                  |
| ------------------------- | ---------------------------- | ---------------------------------------- |
| `hero-residence.jpg`      | `1600585154340-be6161a56a0c` | Contemporary residence exterior, dusk    |
| `islamabad-hills.jpg`     | `1469474968028-56623f02e42e` | Green wooded hillside                    |
| `islamabad-residence.jpg` | `1604014238170-4def1e4e6fcf` | Modern house facade among planting       |
| `margalla-pines.jpg`      | `1464822759023-fed622ff2c3b` | Pine forest, hill country                |
| `cta-skyline.jpg`         | `1600585154526-990dced4db0d` | Residential architecture, wide frame     |
| `about-approach.jpg`      | `1523217582562-09d0def993a6` | Architectural detail, contemporary build |
| `advisory-session.jpg`    | `1600210492486-724fe5c67fb0` | Interior with seating, daylight          |

### Property cover images (7 — one per demo listing)

| File              | Unsplash ID                  | Used by                    |
| ----------------- | ---------------------------- | -------------------------- |
| `property-01.jpg` | `1600047509807-ba8f99d2cdde` | 7.5 Marla Residential Plot |
| `property-02.jpg` | `1580587771525-78b9dba3b914` | 15 Marla Premium Plot      |
| `property-03.jpg` | `1613490493576-7fde63acd811` | 15 Marla Residential Plot  |
| `property-04.jpg` | `1600596542815-ffad4c1539a9` | 10 Marla Residential Plot  |
| `property-05.jpg` | `1582268611958-ebfd161ef9cf` | 10 Marla Investment Plot   |
| `property-06.jpg` | `1600566753376-12c8ab7fb75b` | 10 Marla Premium Plot      |
| `property-07.jpg` | `1613977257363-707ba9348227` | 10 Marla Featured Plot     |

### Shared gallery plates

| File                  | Unsplash ID                  | Subject                      |
| --------------------- | ---------------------------- | ---------------------------- |
| `gallery-living.jpg`  | `1604014237800-1c9102c219da` | Living area                  |
| `gallery-kitchen.jpg` | `1600585152220-90363fe7e115` | Kitchen                      |
| `gallery-bedroom.jpg` | `1600607687644-c7171b42498f` | Bedroom                      |
| `gallery-bath.jpg`    | `1600566752355-35792bedcfea` | Bathroom                     |
| `gallery-lounge.jpg`  | `1565182999561-18d7dc61c393` | Lounge, soft light           |
| `gallery-facade.jpg`  | `1600573472592-401b489a3cdc` | Facade and entrance          |
| `gallery-aerial.jpg`  | `1497436072909-60f360e1d4b1` | Aerial view over development |
| `gallery-land.jpg`    | `1500382017468-9049fed747ef` | Open land, greenery          |

### Plot-size explorer tiles

| File          | Unsplash ID                  | Subject               |
| ------------- | ---------------------------- | --------------------- |
| `plot-75.jpg` | `1512917774080-9991f1c4c750` | Compact plot setting  |
| `plot-10.jpg` | `1600047509358-9dc75507daeb` | Mid-size plot setting |
| `plot-15.jpg` | `1600573472550-8090b5e0745e` | Larger plot setting   |

### Property-type tiles

| File                  | Unsplash ID                  | Subject             |
| --------------------- | ---------------------------- | ------------------- |
| `type-commercial.jpg` | `1486406146926-c627a92ad1ab` | Commercial building |
| `type-apartment.jpg`  | `1545324418-cc1a3fa10c00`    | Apartment interior  |

---

## Replacing the placeholders

The design deliberately keeps all imagery behind descriptive filenames rather
than imported file references, so replacement is a file-for-file swap.

1. **Keep the filenames.** Write the client's real photograph over the existing
   file, e.g. `public/images/property-01.jpg`. Nothing in the code needs to
   change.

2. **Match the aspect ratios** so nothing is unexpectedly cropped:

    | Group                    | Ratio         | Recommended minimum |
    | ------------------------ | ------------- | ------------------- |
    | Hero, cinematic plates   | 16:9 or wider | 2560 × 1440         |
    | Property covers          | 4:3           | 1800 × 1350         |
    | Gallery plates           | 16:10         | 1800 × 1125         |
    | Plot-size and type tiles | 3:2           | 1400 × 933          |

    `next/image` crops with `object-cover`, so a different ratio will still
    render — it will simply crop from the centre.

3. **Apply the same grade.** Re-run the same treatment so new photographs sit
   with the existing ones:

    ```bash
    node scripts/fetch-images.js
    ```

    That script only downloads; for hand-supplied files apply an equivalent light
    grade — saturation ≈ 93%, brightness ≈ 101% — in whatever tool the client
    uses.

4. **Update the alt text.** Alt text currently describes _what is depicted_
   ("Living area", "Green wooded hillside"), which is correct for representative
   imagery. Once a photograph shows a specific plot, the alt text and the
   "Representative imagery" notices on the gallery and featured-story sections
   should be revised to name it, and the disclaimer should be removed from
   `src/app/terms/page.tsx`.

5. **Update the data.** Property images are declared in `src/lib/properties.ts`
   under each listing's `images` array. Section imagery is referenced directly
   by path in the components under `src/components/home/` and
   `src/components/property/`.

---

## Brand assets

`public/brand/` holds the supplied logo, unmodified:

| File                                           | Use                           |
| ---------------------------------------------- | ----------------------------- |
| `safizmarketing-logo.png`                      | Full lockup on light surfaces |
| `safizmarketing-logo-reverse.png`              | Full lockup on navy           |
| `safizmarketing-mark.png` / `-reverse.png`     | Monogram only                 |
| `safizmarketing-wordmark.png` / `-reverse.png` | Wordmark only                 |

These were derived from the client's `reference/logo.avif`. **The artwork itself
is unaltered** — the reverse variants are the same artwork prepared for dark
backgrounds, and no recolouring, redrawing or redrawing of the mark has been
done. If the client prefers to supply their own reverse/simplified variants,
drop them in over these filenames.

The site never places the logo inside a white box: on light surfaces it sits on
the ivory page, and inside the navy header and footer the reverse artwork is
used directly on the navy ground.
