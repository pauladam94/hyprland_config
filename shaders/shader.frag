precision mediump float;
varying vec2 v_texcoord;
uniform sampler2D tex;

vec4 night_mode(vec4 pixColor) {
    pixColor.b *= 0.6;
    return pixColor;
}

vec4 gray_scale(vec4 pixColor) {
    float value = (pixColor.r + pixColor.g + pixColor.b) / 3.;
    pixColor.r = value;
    pixColor.g = value;
    pixColor.b = value;
    return pixColor;
}

vec4 black_white_only(vec4 pixColor) {
    float value =  (pixColor.r + pixColor.g + pixColor.b) / 3.;
    if (value < 0.3) {
        value = 0.;
    }
    pixColor.r = value;
    pixColor.g = value;
    pixColor.b = value;
    return pixColor;
}

vec3 mult(vec3 vec, float m) {
    vec[0] *= m;
    vec[1] *= m;
    vec[2] *= m;
    return vec; 
}


// contrast = 0.0 is not usable
vec4 simple_contrast(vec4 pixColor, float contrast) {
    contrast = max(contrast, 0.1);
    vec3 color = pixColor.rgb;
    vec3 temp = mult(vec3(0.5, 0.5, 0.5), 1. - contrast) + mult(color, contrast);
    vec4 res = vec4(temp, 1.);
    res = clamp(res, 0.0, 1.);
    return res;
}


vec4 complex_contrast(vec3 pixColor, float contrast) {
    vec3 color = pixColor.rgb;
    // color = pow(color, max(contrast, 0.1));
    // color = pow(abs(pixColor * 2 - 1), 1 / max(contrast, 0.0001)) * sign(pixColor - 0.5) + 0.5;
    return vec4(color, 1.);
}

// vec4 crt_fun(vec2 tc, vec4 pixColor) {
//     // Distance from the center
//     float dx = abs(0.5-tc.x);
//     float dy = abs(0.5-tc.y);
//
//     // Square it to smooth the edges
//     dx *= dx;
//     dy *= dy;
//
//     tc.x -= 0.5;
//     tc.x *= 1.0 + (dy * 0.03);
//     tc.x += 0.5;
//
//     tc.y -= 0.5;
//     tc.y *= 1.0 + (dx * 0.03);
//     tc.y += 0.5;
//
//     // Get texel, and add in scanline if need be
//     vec4 cta = texture2D(tex, vec2(tc.x, tc.y));
//     cta.rgb += sin(tc.y * 1250.0) * 0.02;
//
//     // Cutoff
//     if (tc.y > 1.0 || tc.x < 0.0 || tc.x > 1.0 || tc.y < 0.0) {
// 	cta = vec4(0.0);
//     }
//     return cta;
// }

void main() {
    vec4 pixColor = texture2D(tex, v_texcoord);
    vec2 tc = vec2(v_texcoord.x, v_texcoord.y);

    gl_FragColor = pixColor;
    // gl_FragColor = crt_fun(tc, pixColor);
    // gl_FragColor = black_white_only(pixColor);
    // gl_FragColor = simple_contrast(pixColor, 2.0);
    // gl_FragColor = night_mode(pixColor);
}
