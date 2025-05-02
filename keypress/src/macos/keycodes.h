#include <Carbon/Carbon.h>

typedef enum {
  KEY_A = kVK_ANSI_A,
  KEY_B = kVK_ANSI_B,
  KEY_C = kVK_ANSI_C,
  KEY_D = kVK_ANSI_D,
  KEY_E = kVK_ANSI_E,
  KEY_F = kVK_ANSI_F,
  KEY_G = kVK_ANSI_G,
  KEY_H = kVK_ANSI_H,
  KEY_I = kVK_ANSI_I,
  KEY_J = kVK_ANSI_J,
  KEY_K = kVK_ANSI_K,
  KEY_L = kVK_ANSI_L,
  KEY_M = kVK_ANSI_M,
  KEY_N = kVK_ANSI_N,
  KEY_O = kVK_ANSI_O,
  KEY_P = kVK_ANSI_P,
  KEY_Q = kVK_ANSI_Q,
  KEY_R = kVK_ANSI_R,
  KEY_S = kVK_ANSI_S,
  KEY_T = kVK_ANSI_T,
  KEY_U = kVK_ANSI_U,
  KEY_V = kVK_ANSI_V,
  KEY_W = kVK_ANSI_W,
  KEY_X = kVK_ANSI_X,
  KEY_Y = kVK_ANSI_Y,
  KEY_Z = kVK_ANSI_Z,
  KEY_NONE = 0
} Code;

typedef struct {
  const char* key;
  Code value;
} CodeMap;

CodeMap codeMap[] = {
  { "KEY_A", KEY_A },
  { "KEY_B", KEY_B },
  { "KEY_C", KEY_C },
  { "KEY_D", KEY_D },
  { "KEY_E", KEY_E },
  { "KEY_F", KEY_F },
  { "KEY_G", KEY_G },
  { "KEY_H", KEY_H },
  { "KEY_I", KEY_I },
  { "KEY_J", KEY_J },
  { "KEY_K", KEY_K },
  { "KEY_L", KEY_L },
  { "KEY_M", KEY_M },
  { "KEY_N", KEY_N },
  { "KEY_O", KEY_O },
  { "KEY_P", KEY_P },
  { "KEY_Q", KEY_Q },
  { "KEY_R", KEY_R },
  { "KEY_S", KEY_S },
  { "KEY_T", KEY_T },
  { "KEY_U", KEY_U },
  { "KEY_V", KEY_V },
  { "KEY_W", KEY_W },
  { "KEY_X", KEY_X },
  { "KEY_Y", KEY_Y },
  { "KEY_Z", KEY_Z }
};

size_t num_codes = sizeof(codeMap) / sizeof(codeMap[0]);

Code getKeyFromChar(const char* key) {
  for (size_t i = 0; i < num_codes; i++) {
    if (strcmp(codeMap[i].key, key) == 0) return codeMap[i].value;
  }

  return KEY_NONE;
}
