# -*- coding: utf-8 -*-
"""Generates favicons and the Open Graph share image for the site.
Run once locally with: python3 gen_assets.py
Requires Pillow (pip install pillow).
"""
from PIL import Image, ImageDraw, ImageFont

NAVY = (15, 23, 42)
NAVY_LIGHT = (30, 41, 59)
ORANGE = (255, 107, 53)
WHITE = (255, 255, 255)
SLATE = (203, 213, 225)

FONT_BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
FONT_REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"


def make_icon(size):
    img = Image.new("RGB", (size, size), NAVY)
    draw = ImageDraw.Draw(img)
    pad = int(size * 0.14)
    draw.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(size * 0.18), fill=ORANGE)
    font_size = int(size * 0.34)
    font = ImageFont.truetype(FONT_BOLD, font_size)
    text = "365"
    bbox = draw.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text(((size - tw) / 2 - bbox[0], (size - th) / 2 - bbox[1]), text, font=font, fill=NAVY)
    return img


def make_og_image(path):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)

    # subtle diagonal accent band
    draw.polygon([(W * 0.62, 0), (W, 0), (W, H), (W * 0.78, H)], fill=NAVY_LIGHT)

    # logo mark
    mark_size = 84
    mx, my = 80, 74
    draw.rounded_rectangle([mx, my, mx + mark_size, my + mark_size], radius=18, fill=ORANGE)
    f_mark = ImageFont.truetype(FONT_BOLD, 34)
    bbox = draw.textbbox((0, 0), "365", font=f_mark)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    draw.text((mx + (mark_size - tw) / 2 - bbox[0], my + (mark_size - th) / 2 - bbox[1]), "365", font=f_mark, fill=NAVY)

    f_brand = ImageFont.truetype(FONT_BOLD, 40)
    draw.text((mx + mark_size + 22, my + 20), "Drywall365", font=f_brand, fill=WHITE)

    # Headline
    f_head = ImageFont.truetype(FONT_BOLD, 58)
    lines = ["365 Days of Ready-to-Post", "Content for Drywall Contractors"]
    y = 230
    for line in lines:
        draw.text((80, y), line, font=f_head, fill=WHITE)
        y += 72

    f_sub = ImageFont.truetype(FONT_REG, 30)
    draw.text((80, y + 20), "No app to download. Delivered straight to your calendar.", font=f_sub, fill=SLATE)

    img.save(path, "PNG")


if __name__ == "__main__":
    make_icon(16).save("images/favicon-16x16.png")
    make_icon(32).save("images/favicon-32x32.png")
    make_icon(180).save("images/apple-touch-icon.png")

    # favicon.ico (multi-size)
    icon_sizes = [16, 32, 48]
    imgs = [make_icon(s) for s in icon_sizes]
    imgs[0].save("images/favicon.ico", format="ICO", sizes=[(s, s) for s in icon_sizes])

    make_og_image("images/og-image.png")

    print("Assets generated in images/")
