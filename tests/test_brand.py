import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

from equipment.brand import BRAND, safe


def test_brand_has_required_keys():
    for key in ("name", "gold", "dark", "body", "light", "logo"):
        assert key in BRAND, f"BRAND missing key: {key}"


def test_brand_colors_are_rgb_tuples():
    for key in ("gold", "dark", "body", "light"):
        t = BRAND[key]
        assert isinstance(t, tuple) and len(t) == 3
        assert all(0 <= v <= 255 for v in t)


def test_brand_gold_is_correct():
    assert BRAND["gold"] == (212, 160, 23)


def test_brand_dark_is_correct():
    assert BRAND["dark"] == (26, 26, 26)


def test_safe_replaces_em_dash():
    assert "--" in safe("avant — après")


def test_safe_replaces_curly_quotes():
    result = safe("'hello'")
    assert "'" in result


def test_safe_encodes_to_latin1():
    result = safe("café")
    assert isinstance(result, str)


def test_safe_handles_plain_ascii():
    assert safe("hello world") == "hello world"
