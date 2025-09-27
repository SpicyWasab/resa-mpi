<script>
    import { BarcodeDetector } from "barcode-detector/ponyfill";

    let video = undefined;
    let canvas = undefined;
    let img = undefined;

    let stream = undefined;

    let code = "no code for now";

    async function scan(e) {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            }
        });

        video.srcObject = stream;
        video.play();
    }

    async function pic(e) {
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
    
        // Draw the current video frame to the canvas
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    }

    async function barcode(e) {
        // check supported formats
        const supportedFormats = await BarcodeDetector.getSupportedFormats();

        console.log(supportedFormats);

        const barcodeDetector = new BarcodeDetector({
            // make sure the formats are supported
            formats: ["any"],
        });

        // const imageFile = await fetch(
        //     "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Hello%20world!",
        // ).then((resp) => resp.blob());

        const imageFile = await new Promise((resolve, reject) => {
                canvas.toBlob((blob) => {
                    resolve(blob);
                },
                "image/jpeg",
                0.95)
            }
        );

        img.src = URL.createObjectURL(imageFile);

        console.log(imageFile);

        setInterval(() => {
            barcodeDetector.detect(video).then(e => { code = (code == "running" || code == "no code for now") ? e[0]?.rawValue ?? "running" : code }, 10);
        });
    }
</script>

<button on:click={scan}>Scanner</button>

<button on:click={pic}>Photo</button>

<button on:click={barcode}>Code barre</button>

<div>{code}</div>

<img bind:this={img}>

<video bind:this={video}></video>
<canvas bind:this={canvas}></canvas>