function submitPrediction() {
  const f1 = parseFloat(document.getElementById("f1").value);
  const f2 = parseFloat(document.getElementById("f2").value);
  const f3 = parseFloat(document.getElementById("f3").value);
  const f4 = parseFloat(document.getElementById("f4").value);

  // Validasi input
  if ([f1, f2, f3, f4].some(isNaN)) {
    document.getElementById("result").innerText = "Mohon isi semua input dengan angka.";
    return;
  }
  // Tampilkan indikator loading & disable tombol
  const resultEl = document.getElementById("result");
  const btn = document.getElementById("predictBtn");
  resultEl.innerText = "Loading…";
  let imageResult = document.getElementById("imageRes");

  fetch("https://exalth-iris-classify.hf.space/predict", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      input: [f1, f2, f3, f4]
    })
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then(data => {
      resultEl.innerText = "Hasil Prediksi: " + data.prediction;
      imageResult.innerHTML = pathImage(data.prediction)
    })
    .catch(error => {
      console.error("Terjadi kesalahan:", error);
      resultEl.innerText = error;
    });
}
function pathImage(irisName){
  return `<img src="iris-classification/${irisName}.webp" alt="${irisName}" style="max-width:200px;"/>`
}