import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

@Component({
    selector: 'app-camera',
    templateUrl: './camera.component.html',
    styleUrls: ['./camera.component.scss'],
    standalone: false
})
export class CameraComponent {
  capturedImage: string | undefined;

  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera, // Cambiar a CameraSource.Prompt si es necesario para probar
      });
      this.capturedImage = image.dataUrl;
    } catch (error) {
      console.error('Error al capturar imagen:', error);
    }
  }
}

