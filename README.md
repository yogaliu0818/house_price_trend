# Taiwan Housing Heatmap Dashboard

This Remotion project renders a dark, glassmorphism dashboard video for Taiwan housing prices. Data is loaded from an external JSON or CSV file in `public/data`.

## Run

```bash
npm.cmd run dev
npm.cmd run still
npm.cmd run render
```

Use `npm.cmd` on Windows if PowerShell blocks `npm.ps1`.

## Data

Default data path:

```text
public/data/house-prices.json
```

Each record must include:

```json
{
  "countyId": "taipei",
  "countyName": "台北市",
  "year": 2025,
  "averagePrice": 111,
  "unit": "萬/坪"
}
```

CSV is also supported when the composition `dataPath` points to a `.csv` file with these columns:

```text
countyId,countyName,year,averagePrice,unit
```

## Folder Structure

```text
src/
  Root.tsx                         Composition registration and data loading.
  TaiwanHousingDashboard.tsx       Main animated dashboard scene.
  components/
    County.tsx                     Independent animated county SVG path.
    Heatmap.tsx                    Taiwan SVG heatmap and camera movement.
    Legend.tsx                     Blue-to-red color scale.
    Tooltip.tsx                    Highlight details for each county.
    Timeline.tsx                   Year progress indicator.
    KPICards.tsx                   Average, highest, and lowest KPI cards.
    RankingChart.tsx               Animated bar chart ranking.
    TrendChart.tsx                 Multi-year line chart.
    GlassPanel.tsx                 Shared glass panel surface.
    Title.tsx                      Opening title and current year display.
  config/
    videoConfig.ts                 Video dimensions, timing, colors, fonts, paths.
  data/
    taiwanCounties.ts              Replaceable SVG county paths and labels.
    loadHousingData.ts             JSON/CSV external data loader.
  lib/
    housingStats.ts                Rankings, yearly frames, interpolation.
    math.ts                        Animation, color, and formatting helpers.
  types/
    housing.ts                     Shared TypeScript types.
public/
  data/
    house-prices.json              Replaceable sample housing-price dataset.
```

## Replacing The Map

`src/data/taiwanCounties.ts` contains one SVG path per county. For production-accurate geography, replace the `d` path values with official county-level SVG or GeoJSON-derived paths while keeping the same `countyId` values.

## Design Notes

- All animation is frame-driven with Remotion `interpolate()` and `spring()`.
- CSS transitions and browser-only animation APIs are intentionally not used.
- Colors, timing, fonts, video size, and data paths are centralized in `src/config/videoConfig.ts`.
- The heatmap uses blue for lower prices, cyan for middle values, and red for higher prices.
