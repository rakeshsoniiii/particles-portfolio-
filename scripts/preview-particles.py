from PIL import Image, ImageDraw
import struct, colorsys
for name in ['portrait','india']:
 b=open('public/'+name+'.bin','rb').read();scale=struct.unpack_from('<f',b,8)[0];im=Image.new('RGB',(600,600),(34,33,36));d=ImageDraw.Draw(im)
 for i in range(12,len(b),8):
  x,y,z,l,_=struct.unpack_from('<hhhBB',b,i);x*=scale;y*=scale
  rgb=colorsys.hsv_to_rgb((190+y*80+x*50)/360,.3,.25+.75*l/255)
  d.point((round(300+x*260),round(310-y*260)),fill=tuple(round(c*255) for c in rgb))
 im.save('docs/research/'+name+'-particle-preview.png')
