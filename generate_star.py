from PIL import Image, ImageDraw
import math

W = H = 1024
img = Image.new("RGBA", (W,H), (0,0,0,0))
draw = ImageDraw.Draw(img, "RGBA")
cx, cy = 512, 512
size = 420

pts = []
for i in range(200):
    a = 2*math.pi*i/200
    r = size / (0.9 + 0.9 * (abs(math.sin(2*a))**0.7))
    pts.append((cx + r*math.cos(a), cy + r*math.sin(a)))

draw.polygon(pts, fill=(124,84,232,255))
draw.polygon([(512,100),(570,350),(880,480),(500,520)], fill=(200,185,255,110))
draw.polygon([(650,620),(900,520),(512,920),(540,650)], fill=(170,140,250,90))

img.save("star.png")
print("star.png ready")
