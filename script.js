const calculateBtn = document.getElementById("calculateBtn");
const startTimeInput = document.getElementById("startTime");
const movieDurationInput = document.getElementById("movieDuration");
const adDurationInput = document.getElementById("adDuration");
const endTimeResult = document.getElementById("endTimeResult");
const totalDurationResult = document.getElementById("totalDurationResult");

function calculateMovieEndTime() {
  const startTime = startTimeInput.value;
  const movieDuration = Number(movieDurationInput.value);
  const adDuration = Number(adDurationInput.value);

  if (startTime === "") {
    alert("กรุณาเลือกเวลารอบหนังเริ่มฉาย");
    startTimeInput.focus();
    return;
  }

  if (!Number.isFinite(movieDuration) || movieDuration <= 0) {
    alert("กรุณากรอกระยะเวลาหนังเป็นจำนวนมากกว่า 0 นาที");
    movieDurationInput.focus();
    return;
  }

  if (!Number.isFinite(adDuration) || adDuration < 0) {
    alert("กรุณากรอกเวลาโฆษณาเป็นจำนวน 0 นาทีขึ้นไป");
    adDurationInput.focus();
    return;
  }

  const timeParts = startTime.split(":");
  const startHours = Number(timeParts[0]);
  const startMinutes = Number(timeParts[1]);

  const startTotalMinutes = (startHours * 60) + startMinutes;
  const totalDuration = movieDuration + adDuration;
  const endTotalMinutes = startTotalMinutes + totalDuration;

  const endHours = Math.floor(endTotalMinutes / 60) % 24;
  const endMinutes = endTotalMinutes % 60;

  const formattedHours = String(endHours).padStart(2, "0");
  const formattedMinutes = String(endMinutes).padStart(2, "0");

  endTimeResult.textContent = `${formattedHours}:${formattedMinutes} น.`;

  totalDurationResult.textContent =
    `เวลาเริ่ม ${startTime} น. + หนัง ${movieDuration} นาที ` +
    `+ โฆษณา ${adDuration} นาที = รวม ${totalDuration} นาที`;
}

calculateBtn.addEventListener("click", calculateMovieEndTime);

startTimeInput.addEventListener("change", calculateMovieEndTime);
movieDurationInput.addEventListener("input", function () {
  if (movieDurationInput.value !== "") {
    calculateMovieEndTime();
  }
});

adDurationInput.addEventListener("input", function () {
  if (adDurationInput.value !== "") {
    calculateMovieEndTime();
  }
});

calculateMovieEndTime();
