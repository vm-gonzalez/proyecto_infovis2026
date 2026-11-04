// ====================================================================
// PROYECTO INFOVIS 2026 - COCA-COLA (MAQUETA ARDUINO V1 - ENTREGA 2)
// Orden de abajo hacia arriba según la protoboard:
// Pin 6 = Nivel 1 (muy_bajo)
// Pin 5 = Nivel 2 (bajo)
// Pin 4 = Nivel 3 (medio)
// Pin 3 = Nivel 4 (alto)
// Pin 2 = Nivel 5 (muy_alto)
// Pin 7 = Módulo Relé (clic mecánico / bomba de 5V)
// ====================================================================

const int leds[5] = {6, 5, 4, 3, 2}; // De Nivel 1 (abajo) a Nivel 5 (arriba)
const int pinRele = 7;               // Pin del Relé

// Duraciones exactas sincronizadas con js/audio.js (en milisegundos)
const unsigned long duraciones[5] = {410, 550, 750, 1050, 2000};

unsigned long tiempoApagado = 0;
bool activo = false;
int nivelActual = 0;

void setup() {
  Serial.begin(9600);

  for (int i = 0; i < 5; i++) {
    pinMode(leds[i], OUTPUT);
    digitalWrite(leds[i], LOW);
  }
  pinMode(pinRele, OUTPUT);
  digitalWrite(pinRele, LOW);

  // --- TEST AUTOMÁTICO AL PRENDER O CONECTAR EL ARDUINO ---
  for (int i = 0; i < 5; i++) {
    digitalWrite(leds[i], HIGH);
    delay(180);
  }
  digitalWrite(pinRele, HIGH);
  delay(400);
  apagarTodo();
}

void loop() {
  // Leer si la página web (Web Serial) o el Monitor Serial envió un nivel del '1' al '5'
  if (Serial.available() > 0) {
    char c = Serial.read();
    if (c >= '1' && c <= '5') {
      int nivel = c - '0'; // Convierte '1'..'5' a número 1..5
      activarNivel(nivel);
    } else if (c == '0') {
      apagarTodo();
    }
  }

  // Si está en nivel 5 (muy_alto), hacer efecto de "burbujeo" en el LED superior
  if (activo && nivelActual == 5) {
    digitalWrite(leds[4], (millis() / 80) % 2 == 0 ? HIGH : LOW);
  }

  // Apagar automáticamente cuando termina la duración del eructo
  if (activo && millis() >= tiempoApagado) {
    apagarTodo();
  }
}

void activarNivel(int nivel) {
  apagarTodo();
  nivelActual = nivel;
  activo = true;
  tiempoApagado = millis() + duraciones[nivel - 1];

  // Encender la barra de LEDs hasta el nivel correspondiente (1 a 5)
  for (int i = 0; i < nivel; i++) {
    digitalWrite(leds[i], HIGH);
  }

  // Activar el relé durante la misma duración del eructo
  digitalWrite(pinRele, HIGH);
}

void apagarTodo() {
  for (int i = 0; i < 5; i++) {
    digitalWrite(leds[i], LOW);
  }
  digitalWrite(pinRele, LOW);
  activo = false;
  nivelActual = 0;
}
