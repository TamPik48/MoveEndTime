document.addEventListener("DOMContentLoaded", function () {

  const calculateBtn =
    document.getElementById("calculateBtn");

  const startTimeInput =
    document.getElementById("startTime");

  const movieDurationInput =
    document.getElementById("movieDuration");

  const adDurationInput =
    document.getElementById("adDuration");

  const endTimeResult =
    document.getElementById("endTimeResult");

  const totalDurationResult =
    document.getElementById("totalDurationResult");


  function calculateMovieEndTime() {

    const startTime =
      startTimeInput.value;

    const movieDuration =
      Number(movieDurationInput.value);

    const adDuration =
      Number(adDurationInput.value);


    // ตรวจสอบเวลาเริ่มฉาย
    if (startTime === "") {

      endTimeResult.textContent =
        "--:-- น.";

      totalDurationResult.textContent =
        "กรุณาเลือกเวลารอบหนัง";

      return;
    }


    // ตรวจสอบความยาวหนัง
    if (
      !Number.isFinite(movieDuration) ||
      movieDuration <= 0
    ) {

      endTimeResult.textContent =
        "--:-- น.";

      totalDurationResult.textContent =
        "กรุณากรอกระยะเวลาหนังมากกว่า 0 นาที";

      return;
    }


    // ตรวจสอบเวลาโฆษณา
    if (
      !Number.isFinite(adDuration) ||
      adDuration < 0
    ) {

      endTimeResult.textContent =
        "--:-- น.";

      totalDurationResult.textContent =
        "กรุณากรอกเวลาโฆษณา 0 นาทีขึ้นไป";

      return;
    }


    // แยกชั่วโมงและนาที
    const timeParts =
      startTime.split(":");

    const startHours =
      Number(timeParts[0]);

    const startMinutes =
      Number(timeParts[1]);


    // แปลงเวลาเริ่มเป็นนาที
    const startTotalMinutes =
      (startHours * 60) +
      startMinutes;


    // เวลารวม = หนัง + โฆษณา
    const totalDuration =
      movieDuration +
      adDuration;


    // คำนวณเวลาจบ
    const endTotalMinutes =
      startTotalMinutes +
      totalDuration;


    // รองรับกรณีหนังจบหลังเที่ยงคืน
    const endHours =
      Math.floor(endTotalMinutes / 60) % 24;

    const endMinutes =
      endTotalMinutes % 60;


    // เติม 0 ข้างหน้า เช่น 9 → 09
    const formattedHours =
      String(endHours).padStart(2, "0");

    const formattedMinutes =
      String(endMinutes).padStart(2, "0");


    // แสดงเวลาจบ
    endTimeResult.textContent =
      `${formattedHours}:${formattedMinutes} น.`;


    // แสดงรายละเอียดการคำนวณ
    totalDurationResult.textContent =
      `เวลาเริ่ม ${startTime} น. + ` +
      `หนัง ${movieDuration} นาที + ` +
      `โฆษณา ${adDuration} นาที ` +
      `= รวม ${totalDuration} นาที`;
  }


  // กดปุ่มคำนวณ
  calculateBtn.addEventListener(
    "click",
    calculateMovieEndTime
  );


  // กด Enter เพื่อคำนวณ
  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Enter") {
        calculateMovieEndTime();
      }

    }
  );


  // เปลี่ยนเวลาแล้วคำนวณใหม่
  startTimeInput.addEventListener(
    "change",
    calculateMovieEndTime
  );


  // เปลี่ยนความยาวหนังแล้วคำนวณใหม่
  movieDurationInput.addEventListener(
    "input",
    function () {

      if (movieDurationInput.value !== "") {
        calculateMovieEndTime();
      }

    }
  );


  // เปลี่ยนเวลาโฆษณาแล้วคำนวณใหม่
  adDurationInput.addEventListener(
    "input",
    function () {

      if (adDurationInput.value !== "") {
        calculateMovieEndTime();
      }

    }
  );


  // คำนวณค่าเริ่มต้นทันที
  calculateMovieEndTime();

});
