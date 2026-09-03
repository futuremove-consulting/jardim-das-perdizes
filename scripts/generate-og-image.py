#!/usr/bin/env python3
"""
Generate the site's dedicated Open Graph image (public/og-image.jpg, 1200x630).

Brand composition from a real neighborhood photo (Tomie Ohtake sculptures in
the central park, with the bairro towers behind) + design tokens from
src/app/globals.css:
  --brand-strong #0f2140 (bottom scrim for text legibility)
  --accent       #e63946 (brand bar)
  white text     (Ubuntu font family, system-installed)

Run from the repo root:
  python3 scripts/generate-og-image.py

Requires: Pillow (apt python3-pil). No npm dependency added on purpose.
"""

from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SOURCE = (
    ROOT
    / "public/assets/bairro/parque/parque-jardim-das-perdizes-esculturas-tomie-ohtake-sao-paulo.jpg"
)
OUTPUT = ROOT / "public/og-image.jpg"

WIDTH, HEIGHT = 1200, 630

BRAND_STRONG = (15, 33, 64)  # --brand-strong
ACCENT = (230, 57, 70)  # --accent
WHITE = (255, 255, 255)

FONT_DIR = Path("/usr/share/fonts/truetype/ubuntu")
FONT_BOLD = FONT_DIR / "Ubuntu-B.ttf"
FONT_REGULAR = FONT_DIR / "Ubuntu-R.ttf"

EYEBROW = "PERDIZES · SÃO PAULO"
TITLE = "Jardim das Perdizes Broker"
TAGLINE = "Guia, dados verificados e imóveis do bairro planejado"

MARGIN = 72


def cover_crop(image: Image.Image, width: int, height: int) -> Image.Image:
    """Scale to cover the target canvas, then crop anchored to the bottom so
    the sculptures stay in frame (sky is trimmed first)."""
    scale = max(width / image.width, height / image.height)
    resized = image.resize(
        (round(image.width * scale), round(image.height * scale)),
        Image.LANCZOS,
    )
    x = (resized.width - width) // 2
    y = resized.height - height  # bottom-anchored crop
    return resized.crop((x, y, x + width, y + height))


def bottom_scrim(width: int, height: int) -> Image.Image:
    """Brand-strong gradient rising from the bottom for text legibility."""
    scrim = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(scrim)
    fade_start = int(height * 0.42)
    span = height - fade_start
    for y in range(fade_start, height):
        alpha = int(215 * ((y - fade_start) / span) ** 1.2)
        draw.line([(0, y), (width, y)], fill=BRAND_STRONG + (alpha,))
    return scrim


def main() -> None:
    photo = Image.open(SOURCE).convert("RGB")
    canvas = cover_crop(photo, WIDTH, HEIGHT)
    canvas = ImageEnhance.Color(canvas).enhance(1.06)
    canvas = ImageEnhance.Contrast(canvas).enhance(1.03)
    canvas = canvas.convert("RGBA")
    canvas.alpha_composite(bottom_scrim(WIDTH, HEIGHT))

    draw = ImageDraw.Draw(canvas)
    font_title = ImageFont.truetype(str(FONT_BOLD), 64)
    font_tagline = ImageFont.truetype(str(FONT_REGULAR), 30)
    font_eyebrow = ImageFont.truetype(str(FONT_BOLD), 22)

    title_box = draw.textbbox((0, 0), TITLE, font=font_title)
    tagline_box = draw.textbbox((0, 0), TAGLINE, font=font_tagline)
    eyebrow_box = draw.textbbox((0, 0), EYEBROW, font=font_eyebrow)

    # Stack from the bottom margin upward: tagline, title, bar, eyebrow.
    tagline_y = HEIGHT - MARGIN - (tagline_box[3] - tagline_box[1])
    title_y = tagline_y - 20 - (title_box[3] - title_box[1])
    bar_bottom = title_y - 26
    eyebrow_y = bar_bottom - 16 - (eyebrow_box[3] - eyebrow_box[1])

    draw.rectangle([MARGIN, bar_bottom - 6, MARGIN + 56, bar_bottom], fill=ACCENT)
    draw.text(
        (MARGIN, eyebrow_y), EYEBROW, font=font_eyebrow, fill=(*WHITE, 216)
    )
    draw.text((MARGIN, title_y), TITLE, font=font_title, fill=WHITE)
    draw.text(
        (MARGIN, tagline_y), TAGLINE, font=font_tagline, fill=(*WHITE, 238)
    )

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(
        OUTPUT, "JPEG", quality=84, optimize=True, progressive=True
    )
    size_kb = OUTPUT.stat().st_size / 1024
    print(
        f"OG image written: {OUTPUT} — {WIDTH}x{HEIGHT}, {size_kb:.0f} KB"
    )


if __name__ == "__main__":
    main()