package com.example.tuapp;

import android.os.Bundle;
import android.util.Log;
import androidx.appcompat.app.AppCompatActivity;
import com.google.firebase.messaging.FirebaseMessaging;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        // Obtener el token de FCM
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(task -> {
                if (task.isSuccessful()) {
                    // El token se obtiene correctamente
                    String token = task.getResult();
                    Log.d("FCM Token", "Token de FCM: " + token);
                    // Aquí puedes hacer lo que necesites con el token, como enviarlo a tu servidor o usarlo en la campaña
                } else {
                    // Si hay un error al obtener el token
                    Log.e("FCM Token", "Error al obtener el token de FCM", task.getException());
                }
            });
    }
}
