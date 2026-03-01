#include <raylib.h>
// #include <stdio.h>

int main(){
    int height = 720;
    int width = 1280;
    InitWindow(width, height, "Bouncing Ball");
    Vector2 ball_pos = {100, 200};
    Vector2 ball_direction = {1, .4};
    float speed = 550;
    while(!WindowShouldClose()){
        // physics
        if (ball_pos.x + 50 >= width) ball_direction.x *= -1;
        if (ball_pos.x - 50 < 0) ball_direction.x *= -1;
        if (ball_pos.y + 50 >= height) ball_direction.y *= -1;
        if (ball_pos.y - 50 < 0) ball_direction.y *= -1;
        // Update
        float dt = GetFrameTime();
        ball_pos.x += ball_direction.x * speed * dt;
        ball_pos.y += ball_direction.y * speed * dt;
        // Drawing
        BeginDrawing();
        // ClearBackground(BLACK);
        DrawRectangle(0, 0, width, height, (Color){0,0,0,10});
        DrawLineEx((Vector2) {0,0}, (Vector2) {0,720}, 10, WHITE);
        DrawLineEx((Vector2) {0,0}, (Vector2) {1280,0}, 10, WHITE);
        DrawLineEx((Vector2) {1280,0}, (Vector2) {1280,720}, 10, WHITE);
        DrawLineEx((Vector2) {0,720}, (Vector2) {1280,720}, 10, WHITE);
        DrawCircleV(ball_pos,50, RED);

        EndDrawing();
    }
    CloseWindow();
    return 0;
}