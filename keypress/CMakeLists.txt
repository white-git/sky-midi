cmake_minimum_required(VERSION 3.20)
set(CMAKE_CXX_STANDARD 17)

project(macos)

# Source
set(SOURCE_FILES src/keypress_macos.cc)

add_library(${PROJECT_NAME} SHARED ${SOURCE_FILES} ${CMAKE_JS_SRC})
add_compile_definitions(NAPI_CPP_EXCEPTIONS)
add_compile_definitions(NAPI_VERSION=3)

# cmake-js
list(APPEND INCLUDES ${CMAKE_JS_INC})
message(STATUS "Includes: ${INCLUDES}")
list(APPEND LIBS ${CMAKE_JS_LIB})
message(STATUS "Libs: ${LIBS}")

# N-API
target_include_directories(${PROJECT_NAME} PRIVATE "${CMAKE_SOURCE_DIR}/node_modules/node-addon-api")

# Change suffix to *.node
set_target_properties(${PROJECT_NAME} PROPERTIES PREFIX "" SUFFIX ".node")

# BUILD
target_include_directories(${PROJECT_NAME} PRIVATE ${INCLUDES})
target_link_libraries(${PROJECT_NAME} ${LIBS})
