const webhooks = {
    "webhook1": "https://discord.com/api/webhooks/1337136975764783205/gWt5OTPCwlRfgvM_2st9KfsUT6KosBepQMZhALf0sU5TS67GSEmtsH6YYrhXe6bMgqRw",
    "webhook2": "https://discord.com/api/webhooks/1337505501876850809/QZJysCTePIfsDBiVKJXa-DMrUMSa8nmtvzLyjhlu2xchZM-y-Gcbjppd2ymzcRE7694c"
};

function applyEffect(effect) {
    let topic = document.getElementById("embedTopic");
    if (effect === "bold") {
        topic.value = `**${topic.value}**`;
    } else if (effect === "blur") {
        topic.value = `||${topic.value}||`;
    }
}

function sendEmbed() {
    let selectedWebhook = document.getElementById("webhook").value;
    let webhookURL = webhooks[selectedWebhook];
    let embedName = document.getElementById("embedName").value;
    let embedTopic = document.getElementById("embedTopic").value;
    let embedColor = document.getElementById("color").value.replace("#", "");

    let logoURL = document.getElementById("logoURL").value;
    let footerLogoURL = document.getElementById("footerLogoURL").value;
    let bannerURL = document.getElementById("bannerURL").value;
    let endMessage = document.getElementById("endMessage").value;
    let endLogoURL = document.getElementById("endLogoURL").value;
    
    let embed = {
        "title": embedName,
        "description": embedTopic,
        "color": parseInt(embedColor, 16)
    };

    if (logoURL) {
        embed.author = {
            "name": embedName,
            "icon_url": logoURL
        };
    }

    if (footerLogoURL) {
        embed.footer = {
            "icon_url": footerLogoURL,
            "text": " "
        };
    }

    if (bannerURL) {
        embed.image = {
            "url": bannerURL
        };
    }

    if (endMessage && endLogoURL) {
        embed.footer = {
            "icon_url": endLogoURL,
            "text": endMessage
        };
    }

    sendPayload(webhookURL, embed);
}

function sendPayload(webhookURL, embed) {
    let payload = { "embeds": [embed] };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
    }).then(response => {
        if (response.ok) {
            alert("تم إرسال الإيمبد بنجاح!");
        } else {
            throw new Error("حدث خطأ أثناء الإرسال.");
        }
    }).catch(error => {
        alert(error.message);
    });
}
