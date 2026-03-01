#include <raylib.h>
#include <stdlib.h>
#include <time.h>
// #include <stdio.h>
typedef struct {
  Vector2 pos;
  Vector2 dir;
  int radius;
  Color color;
} Circle;
int randRange(int a, int b);
Color choice(Color c[], int size);
int main() {
  int height = 720;
  int width = 1280;
  int ball_count = 100;
  Color c[] = {RED, GREEN, BLUE, PURPLE, VIOLET, YELLOW, DARKBLUE, GOLD, ORANGE, PINK, MAROON};
  srand(time(NULL));
  // initializing balls
  float speed = randRange(20, 50);
  Circle balls[ball_count];
  for (int i = 0; i < ball_count; i++) {
    int radius = randRange(20, 50);
    balls[i] = (Circle){(Vector2){randRange(radius, width - radius),
                                  randRange(radius, height - radius)},
                        (Vector2){randRange(-10, 10), randRange(-10, 10)},
                        radius, choice(c, 11)};
  }
  InitWindow(width, height, "Bouncing Ball");
  while (!WindowShouldClose()) {
    float dt = GetFrameTime();
    // physics
    for (int i = 0; i < ball_count; i++) {

      if (balls[i].pos.x +balls[i].radius >= width) {
        balls[i].pos.x = width-balls[i].radius-1;
        balls[i].dir.x *= -1;
      }
      if (balls[i].pos.x - balls[i].radius < 0) {
        balls[i].pos.x = balls[i].radius+1;
        balls[i].dir.x *= -1;
      }
      if (balls[i].pos.y + balls[i].radius >= height) {
        balls[i].pos.y = height-balls[i].radius-1;
        balls[i].dir.y *= -1;
      }
      if (balls[i].pos.y - balls[i].radius < 0) {
        balls[i].pos.y = balls[i].radius+1;
        balls[i].dir.y *= -1;
      }
      // Update
      balls[i].pos.x += balls[i].dir.x * speed * dt;
      balls[i].pos.y += balls[i].dir.y * speed * dt;
    }

    // Drawing
    BeginDrawing();
    ClearBackground((Color) {30,30,30});
    // DrawRectangle(0, 0, width, height, (Color){30, 30, 30, 15});
    // DrawLineEx((Vector2){0, 0}, (Vector2){0, 720}, 10, WHITE);
    // DrawLineEx((Vector2){0, 0}, (Vector2){1280, 0}, 10, WHITE);
    // DrawLineEx((Vector2){1280, 0}, (Vector2){1280, 720}, 10, WHITE);
    // DrawLineEx((Vector2){0, 720}, (Vector2){1280, 720}, 10, WHITE);
    for (int i = 0; i < ball_count; i++) {
      DrawCircleV(balls[i].pos, balls[i].radius, balls[i].color);
    }
    DrawFPS(0,0);
    EndDrawing();
  }
  CloseWindow();
  return 0;
}

int randRange(int a, int b) { return rand() % (b - a) + a; }
Color choice(Color c[], int size){
    return c[rand()%10];
}