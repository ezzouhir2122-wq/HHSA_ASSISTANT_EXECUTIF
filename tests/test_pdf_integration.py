import sys
import subprocess
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent.parent))

FACTURE_MD = "live/documents/factures/FAC-20260520-001.md"


def test_generate_facture_standard(tmp_path):
    from equipment.generate_pdf_facture import generate_facture
    out = tmp_path / "facture_test.pdf"
    result = generate_facture(FACTURE_MD, str(out), paid=False)
    assert Path(result).exists()
    assert Path(result).stat().st_size > 1000


def test_generate_facture_paid(tmp_path):
    from equipment.generate_pdf_facture import generate_facture
    out = tmp_path / "facture_paid_test.pdf"
    result = generate_facture(FACTURE_MD, str(out), paid=True)
    assert Path(result).exists()
    assert Path(result).stat().st_size > 1000


def test_cli_paid_flag(tmp_path):
    out = tmp_path / "facture_cli.pdf"
    result = subprocess.run(
        [sys.executable, "equipment/generate_pdf_facture.py",
         "--input", FACTURE_MD,
         "--output", str(out),
         "--paid"],
        capture_output=True, text=True
    )
    assert result.returncode == 0
    assert out.exists()
