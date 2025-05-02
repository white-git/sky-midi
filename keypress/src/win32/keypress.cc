#include <napi.h>
#include <windows.h>
#include "keycodes.h"

void keyToggle(WORD keyCode) {
  INPUT input = {0};
  input.type = INPUT_KEYBOARD;
  input.ki.wVk = keyCode;
  input.ki.dwFlags = KEYEVENTF_KEYDOWN;
  SendInput(1, &input, sizeof(INPUT));

  ZeroMemory(&input, sizeof(INPUT));
  input.type = INPUT_KEYBOARD;
  input.ki.wVk = keyCode;
  input.ki.dwFlags = KEYEVENTF_KEYUP;
  SendInput(1, &input, sizeof(INPUT));
}

Napi::Number _keyToggle(const Napi::CallbackInfo &info) {
  Napi::Env env = info.Env();
  std::string keyCode = info[0].As<Napi::String>();
  keyToggle(getKeyFromChar(keyCode.c_str()));
  return Napi::Number::New(env, 1);
}

Napi::Object Init(Napi::Env env, Napi::Object exports) {
  exports.Set(Napi::String::New(env, "keyToggle"), Napi::Function::New(env, _keyToggle));
  return exports;
}

NODE_API_MODULE(keypress_win32, Init);
