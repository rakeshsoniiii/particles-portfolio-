from pathlib import Path
p=Path('scripts/personalize-particles.py');s=p.read_text();start=s.index('def inside(');end=s.index("save('public/india.bin'",start)
s=s[:start]+'''from PIL import ImageDraw
mask=Image.new('1',(1200,1200));draw=ImageDraw.Draw(mask)
def pixel(p):return ((p[0]-68)/30*1199,(36-p[1])/30*1199)
for poly in polys:
 draw.polygon([pixel(p) for p in poly[0]],fill=1)
 for hole in poly[1:]:draw.polygon([pixel(p) for p in hole],fill=0)
pts=[]
while len(pts)<N:
 px=random.randrange(1200);py=random.randrange(1200)
 if not mask.getpixel((px,py)):continue
 x=68+px/1199*30;y=36-py/1199*30
 pts.append(((x-83)*.062*math.cos(math.radians(23)),(y-21)*.062,random.uniform(-.035,.035),random.randrange(140,256)))
''' +s[end:]
s=s.replace("s=s.replace('varying float vRingShade;'", "s=s.replace('varying float vRingShade;\\n varying vec3 vPortraitTint;', 'varying float vRingShade;')\ns=s.replace('varying float vRingShade;'")
p.write_text(s)
