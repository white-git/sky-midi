{
  "targets": [
    # {
    #   "target_name": "macos",
    #   "cflags!": [ "-fno-exceptions" ],
    #   "cflags_cc!": [ "-fno-exceptions" ],
    #   "sources": [ "src/macos/keypress.cc" ],
    #   "include_dirs": [
    #     "<!@(node -p \"require('node-addon-api').include\")"
    #   ],
    #   'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    # },
    {
      "target_name": "win32",
      "cflags!": [ "-fno-exceptions" ],
      "cflags_cc!": [ "-fno-exceptions" ],
      "sources": [ "src/win32/keypress.cc" ],
      "include_dirs": [
        "<!@(node -p \"require('node-addon-api').include\")"
      ],
      'defines': [ 'NAPI_DISABLE_CPP_EXCEPTIONS' ],
    }
  ]
}
