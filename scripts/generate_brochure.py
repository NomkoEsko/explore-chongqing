# -*- coding: utf-8 -*-
from pathlib import Path
import os

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import simpleSplit
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.pdfgen import canvas


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "downloads" / "ulaanbaatar-brochure.pdf"
PAGE_W, PAGE_H = A4
MARGIN = 46
BLUE = colors.HexColor("#0B2A55")
SKY = colors.HexColor("#36A8E8")
GOLD = colors.HexColor("#D7A833")
SOFT = colors.HexColor("#EEF6FF")
TEXT = colors.HexColor("#17233A")
MUTED = colors.HexColor("#5D6E82")


def find_font(*names):
    candidates = []
    windir = os.environ.get("WINDIR", "C:\\Windows")
    font_dir = Path(windir) / "Fonts"
    for name in names:
      candidates.append(font_dir / name)
    candidates.extend(
        [
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
            Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"),
            Path("/Library/Fonts/Arial Unicode.ttf"),
        ]
    )
    for path in candidates:
        if path.exists():
            return path
    return None


def register_fonts():
    regular = find_font("arial.ttf", "segoeui.ttf", "calibri.ttf")
    bold = find_font("arialbd.ttf", "segoeuib.ttf", "calibrib.ttf") or regular
    if not regular:
        raise RuntimeError("Cyrillic-capable font not found.")
    pdfmetrics.registerFont(TTFont("UBRegular", str(regular)))
    pdfmetrics.registerFont(TTFont("UBBold", str(bold)))


def draw_paragraph(c, text, x, y, width, size=10.4, leading=15, color=TEXT, font="UBRegular"):
    c.setFont(font, size)
    c.setFillColor(color)
    for line in simpleSplit(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_footer(c, page, total):
    c.setStrokeColor(colors.HexColor("#D8E5F3"))
    c.line(MARGIN, 34, PAGE_W - MARGIN, 34)
    c.setFillColor(MUTED)
    c.setFont("UBRegular", 8.8)
    c.drawString(MARGIN, 20, "Улаанбаатар хотын танилцуулга - загвар төсөл")
    c.drawRightString(PAGE_W - MARGIN, 20, f"{page} / {total}")


def draw_header(c, title):
    c.setFillColor(BLUE)
    c.roundRect(MARGIN, PAGE_H - 70, PAGE_W - MARGIN * 2, 30, 6, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont("UBBold", 11)
    c.drawString(MARGIN + 14, PAGE_H - 58, title)


def photo_box(c, x, y, w, h, label):
    c.setFillColor(SOFT)
    c.roundRect(x, y, w, h, 8, fill=1, stroke=0)
    c.setStrokeColor(colors.HexColor("#C3D9EE"))
    c.roundRect(x, y, w, h, 8, fill=0, stroke=1)
    c.setFillColor(BLUE)
    c.setFont("UBBold", 11)
    c.drawCentredString(x + w / 2, y + h / 2 + 8, label)
    c.setFillColor(MUTED)
    c.setFont("UBRegular", 8.8)
    c.drawCentredString(x + w / 2, y + h / 2 - 10, "Зураг солих хэсэг")


def pill(c, x, y, text, fill=SOFT):
    c.setFillColor(fill)
    c.roundRect(x, y, 148, 28, 7, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("UBBold", 9)
    c.drawString(x + 10, y + 9, text)


def section_title(c, text, y):
    c.setFillColor(GOLD)
    c.rect(MARGIN, y - 4, 26, 4, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("UBBold", 19)
    c.drawString(MARGIN, y - 28, text)
    return y - 48


def bullets(c, items, x, y, width, size=10.1):
    for item in items:
        c.setFillColor(GOLD)
        c.circle(x + 4, y + 4, 3, fill=1, stroke=0)
        y = draw_paragraph(c, item, x + 16, y, width - 16, size=size, leading=14.6)
        y -= 6
    return y


def make_pdf():
    register_fonts()
    OUT.parent.mkdir(parents=True, exist_ok=True)
    c = canvas.Canvas(str(OUT), pagesize=A4)
    total = 6

    # Page 1
    c.setFillColor(BLUE)
    c.rect(0, 0, PAGE_W, PAGE_H, fill=1, stroke=0)
    c.setFillColor(SKY)
    c.circle(PAGE_W - 80, PAGE_H - 90, 92, fill=1, stroke=0)
    c.setFillColor(GOLD)
    c.circle(PAGE_W - 110, PAGE_H - 128, 38, fill=1, stroke=0)
    c.setFillColor(colors.white)
    c.setFont("UBBold", 31)
    c.drawString(MARGIN, PAGE_H - 150, "Улаанбаатар")
    c.setFont("UBBold", 24)
    c.drawString(MARGIN, PAGE_H - 184, "хотын танилцуулга")
    c.setFont("UBRegular", 12.5)
    draw_paragraph(
        c,
        "Монгол Улсын нийслэл хотын тухай аялал, соёл, үзэх газар, зөвлөмжийг нэгтгэсэн хэвлэхэд тохиромжтой загвар товхимол.",
        MARGIN,
        PAGE_H - 225,
        PAGE_W - MARGIN * 2 - 20,
        size=12.5,
        leading=18,
        color=colors.HexColor("#EAF6FF"),
    )
    photo_box(c, MARGIN, 186, PAGE_W - MARGIN * 2, 270, "Улаанбаатар хотын зураг")
    c.setFillColor(colors.HexColor("#FFF2C6"))
    c.roundRect(MARGIN, 118, PAGE_W - MARGIN * 2, 42, 8, fill=1, stroke=0)
    c.setFillColor(BLUE)
    c.setFont("UBBold", 10.5)
    c.drawString(MARGIN + 14, 143, "Загвар төсөл")
    c.setFont("UBRegular", 9.8)
    c.drawString(MARGIN + 14, 128, "Албан мэдээлэл, зураг, холбоо барих сувгийг нийтлэхээс өмнө баталгаажуулна.")
    draw_footer(c, 1, total)
    c.showPage()

    # Page 2
    draw_header(c, "Гарчиг ба ерөнхий танилцуулга")
    y = section_title(c, "Гарчиг", PAGE_H - 96)
    y -= 32
    contents = [
        "1. Ерөнхий танилцуулга",
        "2. Түүх ба байршил",
        "3. Үзэх газрууд",
        "4. Соёл ба хоол",
        "5. Аяллын зөвлөмж",
        "6. Холбоо барих ба дараагийн алхам",
    ]
    for index, item in enumerate(contents, start=1):
        pill(c, MARGIN + ((index - 1) % 2) * 172, y - ((index - 1) // 2) * 38, item)
    y -= 132
    y = section_title(c, "Ерөнхий танилцуулга", y)
    y = draw_paragraph(
        c,
        "Улаанбаатар бол Монгол Улсын нийслэл хот бөгөөд улс төр, соёл, боловсрол, үйлчилгээ, хотын өдөр тутмын амьдралын олон өнгийг нэг дор мэдрүүлдэг орон зай юм. Энэхүү товхимол нь зочин, аялагч, суралцагч болон хотын тухай танилцахыг хүссэн хүмүүст зориулсан эхний загвар агуулга юм.",
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
        size=11,
        leading=16.5,
    )
    y -= 18
    photo_box(c, MARGIN, y - 152, PAGE_W - MARGIN * 2, 132, "Хотын ерөнхий зураг")
    y -= 180
    c.setFillColor(SOFT)
    c.roundRect(MARGIN, y - 54, PAGE_W - MARGIN * 2, 54, 8, fill=1, stroke=0)
    draw_paragraph(
        c,
        "Санамж: Энэ товхимол нь албан ёсны засгийн газрын сайт эсвэл албан эх сурвалж биш. Нийтлэхээс өмнө статистик, үнэ, цагийн хуваарь, холбоо барих мэдээллийг нягтална.",
        MARGIN + 14,
        y - 20,
        PAGE_W - MARGIN * 2 - 28,
        size=9.5,
        leading=13,
        color=BLUE,
        font="UBBold",
    )
    draw_footer(c, 2, total)
    c.showPage()

    # Page 3
    draw_header(c, "Түүх ба байршил")
    y = section_title(c, "Товч түүх", PAGE_H - 96)
    y = draw_paragraph(
        c,
        "Улаанбаатар хотын түүх, нэршил, хөгжлийн үе шатыг дэлгэрэнгүй нийтлэхдээ баталгаатай огноо, албан эх сурвалж, тайлбарыг ашиглах шаардлагатай. Одоогоор энэ хэсэг ерөнхий танилцуулгын загвар хэлбэрээр байна.",
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
        size=11,
        leading=16.5,
    )
    y -= 12
    c.setFillColor(colors.HexColor("#FFF2C6"))
    c.roundRect(MARGIN, y - 42, PAGE_W - MARGIN * 2, 42, 8, fill=1, stroke=0)
    draw_paragraph(c, "Мэдээлэл шинэчлэгдэж байна", MARGIN + 14, y - 16, 330, size=10.5, leading=14, color=BLUE, font="UBBold")
    y -= 82
    y = section_title(c, "Газарзүйн байршил", y)
    y = draw_paragraph(
        c,
        "Хот нь Монгол орны төвийн бүсэд, уулсаар хүрээлэгдсэн хөндийд байрладаг. Аяллын маршрут, газрын зураг, чиглэл, тээврийн мэдээллийг нийтлэх үеийн бодит нөхцөлтэй уялдуулан шинэчилнэ.",
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
        size=11,
        leading=16.5,
    )
    photo_box(c, MARGIN, 116, PAGE_W - MARGIN * 2, 210, "Газрын зураг эсвэл байрлалын зураг")
    draw_footer(c, 3, total)
    c.showPage()

    # Page 4
    draw_header(c, "Үзэх газрууд")
    y = section_title(c, "Төлөөлөх газрууд", PAGE_H - 96)
    attractions = [
        ("Сүхбаатарын талбай", "Хотын төвийн гол талбай, олон нийтийн арга хэмжээний төлөөлөх орчин."),
        ("Гандантэгчэнлин хийд", "Уламжлалт соёл, шашны өв, хотын түүхэн орчныг мэдрэх боломжтой газар."),
        ("Зайсан толгой", "Хотын дүр зургийг өндөрлөгөөс харах боломжтой аяллын цэг."),
        ("Богд хааны ордон музей", "Монголын түүх, урлаг, ордны соёлтой танилцах музейн орчин."),
        ("Чингис хаан Үндэсний музей", "Үндэсний түүх, өв соёлыг танилцуулах музейн төлөөлөл."),
        ("Үндэсний цэцэрлэгт хүрээлэн", "Алхах, амрах, гэр бүлээрээ цаг өнгөрүүлэх ногоон орчин."),
    ]
    box_w = (PAGE_W - MARGIN * 2 - 16) / 2
    for i, (name, desc) in enumerate(attractions):
        col = i % 2
        row = i // 2
        x = MARGIN + col * (box_w + 16)
        top = y - row * 130
        c.setFillColor(colors.white)
        c.roundRect(x, top - 112, box_w, 112, 8, fill=1, stroke=0)
        c.setStrokeColor(colors.HexColor("#D8E5F3"))
        c.roundRect(x, top - 112, box_w, 112, 8, fill=0, stroke=1)
        c.setFillColor(SOFT)
        c.roundRect(x + 10, top - 48, 58, 38, 6, fill=1, stroke=0)
        c.setFillColor(BLUE)
        c.setFont("UBBold", 10.3)
        c.drawString(x + 78, top - 24, name)
        draw_paragraph(c, desc, x + 78, top - 43, box_w - 88, size=8.7, leading=11.5, color=MUTED)
    draw_footer(c, 4, total)
    c.showPage()

    # Page 5
    draw_header(c, "Соёл, хоол ба аяллын зөвлөмж")
    y = section_title(c, "Соёл ба хотын амьдрал", PAGE_H - 96)
    y = draw_paragraph(
        c,
        "Улаанбаатар хотод монголын уламжлалт соёл, орчин үеийн үйлчилгээ, урлаг, музей, худалдаа, хотын өдөр тутмын хэмнэл зэрэгцэн оршдог. Зочид үндэсний хоол, үзвэр, соёлын арга хэмжээ, музейн орчноор дамжуулан хотын олон талт дүр төрхтэй танилцах боломжтой.",
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
        size=10.7,
        leading=16,
    )
    y -= 18
    c.setFont("UBBold", 14)
    c.setFillColor(BLUE)
    c.drawString(MARGIN, y, "Жишээ хоолнууд")
    y -= 24
    y = bullets(
        c,
        [
            "Бууз - жигнэсэн махан хоолны төлөөлөл.",
            "Хуушуур - шарж бэлтгэдэг, түгээмэл танигдсан хоол.",
            "Цуйван - гурил, мах, ногоотой гэрийн хоолны жишээ.",
            "Сүүтэй цай - монгол ахуйн цайны соёлтой холбоотой ундаа.",
        ],
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
    )
    y -= 12
    c.setFont("UBBold", 14)
    c.setFillColor(BLUE)
    c.drawString(MARGIN, y, "Ерөнхий зөвлөмж")
    y -= 24
    bullets(
        c,
        [
            "Цаг агаарт тохируулан хувцаслаж, аяллын чиглэлээ урьдчилан төлөвлөнө.",
            "Нийтийн тээвэр, төлбөр, цагийн хуваарь зэрэг өөрчлөгдөх мэдээллийг тухайн үед шалгана.",
            "Албан байгууллага, музей, үйлчилгээний газар руу очихын өмнө шууд лавлах нь зүйтэй.",
            "Хувийн эд зүйл, бичиг баримтаа анхаарч, танихгүй орчинд баталгаатай чиглэл ашиглана.",
        ],
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
    )
    draw_footer(c, 5, total)
    c.showPage()

    # Page 6
    draw_header(c, "Холбоо барих ба дараагийн алхам")
    y = section_title(c, "Нийтлэхээс өмнө баталгаажуулах", PAGE_H - 96)
    y = bullets(
        c,
        [
            "Албан статистик, хүн ам, газар нутгийн хэмжээ",
            "Музей, үзвэрийн цагийн хуваарь, үнэ",
            "Нийтийн тээврийн бодит чиглэл, төлбөр",
            "Албан холбоо барих утас, имэйл, хаяг",
            "Газрын зураг болон зураг ашиглах эрх",
        ],
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
    )
    y -= 18
    y = section_title(c, "Холбоо барих", y)
    y = draw_paragraph(
        c,
        "Энэ товхимолд албан холбоо барих утас, имэйл, хаягийг зориуд оруулаагүй. Байгууллага, аяллын мэдээлэл, үйлчилгээний сувгийг нийтлэхийн өмнө баталгаатай эх сурвалжаар шинэчилнэ.",
        MARGIN,
        y,
        PAGE_W - MARGIN * 2,
        size=11,
        leading=16.5,
    )
    y -= 18
    photo_box(c, MARGIN, y - 142, PAGE_W - MARGIN * 2, 122, "QR код болон хаалтын зураг")
    c.setFillColor(BLUE)
    c.setFont("UBBold", 12)
    c.drawString(MARGIN, 92, "Дараагийн алхам")
    draw_paragraph(
        c,
        "Веб сайт болон PDF товхимол байнгын нийтийн URL-тай болсны дараа хоёр тусдаа QR кодыг дахин үүсгэнэ.",
        MARGIN,
        72,
        PAGE_W - MARGIN * 2,
        size=10,
        leading=14,
        color=MUTED,
    )
    draw_footer(c, 6, total)
    c.save()
    print(OUT)


if __name__ == "__main__":
    make_pdf()
