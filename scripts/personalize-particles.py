"""
Generate a COMPLETE, ACCURATE India map particle binary (india.bin) that includes
all territories as per India's official political map (Survey of India):
- Jammu & Kashmir (including PoK / Azad Kashmir / Gilgit-Baltistan)
- Ladakh (including Aksai Chin)
- Lakshadweep, Andaman & Nicobar Islands

Data source: docs/research/official_india.geojson (Survey of India boundary standard)
"""
from PIL import Image, ImageDraw
import json, random, struct, math
from pathlib import Path

random.seed(8696)
N = 44000

# ── Portrait generation (unchanged) ──────────────────────────────────
im = Image.open('public/assets/MY.png').convert('RGB')
w, h = im.size
background = Image.new("L", (w, h))
background.putdata([255 if min(p) > 220 else 0 for p in im.getdata()])
ImageDraw.floodfill(background, (0, 0), 128)
ImageDraw.floodfill(background, (w-1, 0), 128)
pts = []
while len(pts) < N:
    x = random.randrange(w); y = random.randrange(h)
    r, g, b = im.getpixel((x, y))
    if background.getpixel((x, y)) == 128:
        continue
    lum = (.2126*r + .7152*g + .0722*b) / 255
    px = (x/w - .5) * 1.65
    py = (.5 - y/h) * 1.98
    z = .12 * math.exp(-((px/.48)**2 + ((py-.28)/.65)**2)) + .06*lum
    pts.append((px, py, z, round(255*(.2 + .8*lum))))

def save(name, ps):
    scale = max(abs(v) for p in ps for v in p[:3]) / 32760
    out = bytearray(struct.pack('<4sIf', b'PPT1', len(ps), scale))
    for x, y, z, l in ps:
        out.extend(struct.pack('<hhhBB', round(x/scale), round(y/scale), round(z/scale), l, 0))
    Path(name).write_bytes(out)

save('public/portrait.bin', pts)

# ── Complete Official India map with full PoK, Ladakh, Aksai Chin ───
geo = json.loads(Path('docs/research/official_india.geojson').read_text(encoding='utf-8'))
features = geo.get('features', [geo] if 'geometry' in geo else [])

mask_w, mask_h = 1500, 1600
mask = Image.new('1', (mask_w, mask_h))
draw = ImageDraw.Draw(mask)

LON_MIN, LON_MAX = 68.0, 98.0
LAT_MIN, LAT_MAX = 6.0, 38.0

def pixel(p):
    return (
        (p[0] - LON_MIN) / (LON_MAX - LON_MIN) * (mask_w - 1),
        (LAT_MAX - p[1]) / (LAT_MAX - LAT_MIN) * (mask_h - 1)
    )

for f in features:
    geom = f['geometry']
    coords = geom['coordinates']
    gtype = geom['type']
    polys = [coords] if gtype == 'Polygon' else coords if gtype == 'MultiPolygon' else []
    for poly in polys:
        if len(poly[0]) >= 3:
            draw.polygon([pixel(p) for p in poly[0]], fill=1)
        for hole in poly[1:]:
            if len(hole) >= 3:
                draw.polygon([pixel(p) for p in hole], fill=0)

# Generate particles
pts = []
while len(pts) < N:
    px = random.randrange(mask_w)
    py = random.randrange(mask_h)
    if not mask.getpixel((px, py)):
        continue
    x = LON_MIN + px / (mask_w - 1) * (LON_MAX - LON_MIN)
    y = LAT_MAX - py / (mask_h - 1) * (LAT_MAX - LAT_MIN)
    pts.append((
        (x - 82.8) * .062 * math.cos(math.radians(22)),
        (y - 21.9) * .062,
        random.uniform(-.035, .035),
        random.randrange(140, 256)
    ))

save('public/india.bin', pts)

# ── Shader tint patch (only if not already patched) ──────────────────
p = Path('public/_next/static/chunks/1stl4ykwpf_a2.js')
s = p.read_text(encoding='utf8')
if '/italy.bin' in s:
    s = s.replace('/italy.bin', '/india.bin')
if 'vPortraitTint' not in s:
    s = s.replace('varying float vRingShade;', 'varying float vRingShade;\n varying vec3 vPortraitTint;')
    s = s.replace('void main() {\n    // The preloader',
        'void main() {\n    vPortraitTint = 0.68 + 0.32*cos(vec3(0.0,2.094,4.188) + position.y*2.8 + position.x*2.0);\n    // The preloader')
    s = s.replace('vec4(uColor, min(shade * vAlpha * uExposure, 1.0))',
        'vec4(uColor * vPortraitTint, min(shade * vAlpha * uExposure, 1.0))')
p.write_text(s, encoding='utf8')

print('[OK] Generated 44,000 portrait points and 44,000 COMPLETE India points (Official Survey of India map with PoK + Aksai Chin)')
print('[OK] Applied subtle RGB shader tint')
