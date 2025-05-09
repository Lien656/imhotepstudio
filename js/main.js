document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("#contact-form");

  if (!form) return;

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = {
      name: form.querySelector('input[name="name"]').value,
      email: form.querySelector('input[name="email"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      message: form.querySelector('textarea[name="message"]').value,
    };

    try {
      const response = await fetch("https://imhotep-backend.onrender.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        form.reset();
      } else {
        alert("Произошла ошибка при отправке. Попробуйте ещё раз.");
      }
    } catch (error) {
      alert("Не удалось связаться с сервером. Проверьте соединение.");
    }
  });
});
