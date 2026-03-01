#include <raylib.h>
#include <stdio.h>
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
	float height = 720;
	float width = 1280;
	int ball_count = 100;

	Color c[] = {RED, GREEN, BLUE, PURPLE, VIOLET, YELLOW,
		DARKBLUE, GOLD, ORANGE, PINK, MAROON};
	srand(time(NULL));
	// initializing balls
	float speed = randRange(20, 50);
	Circle balls[ball_count];
	for (int i = 0; i < ball_count; i++) {
		int radius = randRange(20, 50);
		balls[i] = (Circle){
			(Vector2){
				randRange(radius, width - radius),
				randRange(radius, height - radius)},
			(Vector2){
				randRange(-10, 10),
				randRange(-10, 10),
			},
			radius,
			choice(c, 11),
		};
	}
	int target = 0;
	Vector2 camera_pos = balls[target].pos;
	Camera2D camera = {(Vector2){width / 2, height / 2}, balls[target].pos, 0, 1};
	InitWindow(width, height, "Bouncing Ball");
	while (!WindowShouldClose()) {
		float dt = GetFrameTime();
		// physics
		for (int i = 0; i < ball_count; i++) {

			if (balls[i].pos.x + balls[i].radius >= width) {
				balls[i].pos.x = width - balls[i].radius - 1;
				balls[i].dir.x *= -1;
			}
			if (balls[i].pos.x - balls[i].radius < 0) {
				balls[i].pos.x = balls[i].radius + 1;
				balls[i].dir.x *= -1;
			}
			if (balls[i].pos.y + balls[i].radius >= height) {
				balls[i].pos.y = height - balls[i].radius - 1;
				balls[i].dir.y *= -1;
			}
			if (balls[i].pos.y - balls[i].radius < 0) {
				balls[i].pos.y = balls[i].radius + 1;
				balls[i].dir.y *= -1;
			}
			// Update
			balls[i].pos.x += balls[i].dir.x * speed * dt;
			balls[i].pos.y += balls[i].dir.y * speed * dt;
		}
		// smooth camera movement
		camera_pos.x += (balls[target].pos.x-camera_pos.x)/(30);
		camera_pos.y += (balls[target].pos.y-camera_pos.y)/(30);
		camera.target = camera_pos;

		// zoom logic
		if (IsKeyDown(KEY_Q) && camera.zoom >= .2)
			camera.zoom -= 0.01;
		if (IsKeyDown(KEY_W) && camera.zoom <= 20)
			camera.zoom += 0.01;
		if (IsKeyPressed(KEY_RIGHT))
			target = (target + 1) % ball_count;
		// if(IsKeyPressed(KEY_LEFT)) target = (target-1)%ball_count;
		// Drawing
		BeginDrawing();
		BeginMode2D(camera);
		ClearBackground((Color){30, 30, 30});
		// DrawRectangle(0, 0, width, height, (Color){30, 30, 30, 15});
		DrawLineEx((Vector2){0, 0}, (Vector2){0, 720}, 10, WHITE);
		DrawLineEx((Vector2){0, 0}, (Vector2){1280, 0}, 10, WHITE);
		DrawLineEx((Vector2){1280, 0}, (Vector2){1280, 720}, 10, WHITE);
		DrawLineEx((Vector2){0, 720}, (Vector2){1280, 720}, 10, WHITE);
		for (int i = 0; i < ball_count; i++) {
			if (i == target) {
				DrawCircleV(balls[i].pos, balls[i].radius + 10, WHITE);
				DrawCircleV(balls[i].pos, balls[i].radius, balls[i].color);
			} else {
				DrawCircleV(balls[i].pos, balls[i].radius, balls[i].color);
			}
		}
		EndMode2D();
		DrawFPS(0, 0);
		char text[50];
		sprintf(text, "Zoom: %f", camera.zoom);
		DrawText(text, 0, 20, 30, GREEN);
		EndDrawing();
	}
	CloseWindow();
	return 0;
}

int randRange(int a, int b) { return rand() % (b - a) + a; }
Color choice(Color c[], int size) { return c[rand() % size]; }
