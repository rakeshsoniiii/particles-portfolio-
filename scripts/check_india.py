import json
g = json.load(open('docs/research/india.geojson'))
c = g['geometry']['coordinates']
gtype = g['geometry']['type']
print(f'Type: {gtype}')
print(f'Polygons: {len(c)}')
bbox_lons = [p[0] for poly in c for ring in poly for p in ring]
bbox_lats = [p[1] for poly in c for ring in poly for p in ring]
print(f'Lon range: {min(bbox_lons):.2f} to {max(bbox_lons):.2f}')
print(f'Lat range: {min(bbox_lats):.2f} to {max(bbox_lats):.2f}')
# Check if PoK/Aksai Chin region is included (should go up to ~37N lat and ~74-80E lon)
northern_points = [p for poly in c for ring in poly for p in ring if p[1] > 35]
print(f'Points above 35N latitude: {len(northern_points)}')
if northern_points:
    nlon = [p[0] for p in northern_points]
    nlat = [p[1] for p in northern_points]
    print(f'  Northern Lon range: {min(nlon):.2f} to {max(nlon):.2f}')
    print(f'  Northern Lat range: {min(nlat):.2f} to {max(nlat):.2f}')
