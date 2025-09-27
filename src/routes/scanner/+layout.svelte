<script>
    import { onDestroy, onMount } from 'svelte';
    import { BarcodeDetector } from 'barcode-detector';
    import { scanResult } from './store';

    // on initialise une interface de scanner qui sera utilisée pour les 3 pages de scan
    /** @type {HTMLVideoElement}*/
    let videoElement;
    let buttonText = $state("Scanner");
    let intervalId;
    /** @type {BarcodeDetector} */
    let barcodeDetector;

    onMount(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            }
        });

        videoElement.srcObject = stream;
        videoElement.play();

        const supportedFormats = await BarcodeDetector.getSupportedFormats();

        barcodeDetector = new BarcodeDetector({
            // make sure the formats are supported
            formats: supportedFormats,
        });
    });

    onDestroy(() => {
        clearInterval(intervalId);
    });

    function scan() {
        buttonText = "Scan en cours";
        intervalId = setInterval(() => {
            barcodeDetector.detect(videoElement).then(e => {
                if(e.length != 0) {
                    buttonText = "Relancer"
                    $scanResult = e[0].rawValue;
                    clearInterval(intervalId);
                }
            }, 10);
        });
    }

    let { children } = $props();
</script>

<!-- svelte-ignore a11y_media_has_caption -->
<div id="scanner-view">
    <div id="scanner">
        <video bind:this={videoElement}></video>
        <button onclick={scan}>{buttonText}</button>
    </div>
    <div>
        {@render children?.()}
    </div>
</div>

<style>
    #scanner-view {
        display: grid;
        grid-template-rows: 3fr 1fr;
        height: 100%;
    }

    #scanner {
        display: grid;

    }

    video {
        width: 100%;
        height: 100%;
        background-color: black;
    }
</style>