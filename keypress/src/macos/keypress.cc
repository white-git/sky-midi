#include <napi.h>
#include <ApplicationServices/ApplicationServices.h>
#include "keycodes.h"

void keyToggle(CGKeyCode keycode) {
  CGEventRef down = CGEventCreateKeyboardEvent(NULL, keycode, true);
  CGEventPost(kCGSessionEventTap, down);
  CFRelease(down);

  CGEventRef up = CGEventCreateKeyboardEvent(NULL, keycode, false);
  CGEventPost(kCGSessionEventTap, up);
  CFRelease(up);
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

NODE_API_MODULE(keypress_macos, Init);
