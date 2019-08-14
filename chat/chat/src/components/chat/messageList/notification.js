export default function notifyMe(message, from) {
    // Проверка поддержки браузером уведомлений
    if (!("Notification" in window)) {
        alert("This browser does not support desktop notification");
    }

    // Проверка разрешения на отправку уведомлений
    else if (Notification.permission === "granted") {
        // Если разрешено, то создаем уведомление
        const notification = new Notification(message);
    }

    // В противном случае, запрашиваем разрешение
    else if (Notification.permission !== "denied") {
        Notification.requestPermission(function(permission) {
            // Если пользователь разрешил, то создаем уведомление
            if (permission === "granted") {
                const notification = new Notification(message);
            }
        });
    }
}
