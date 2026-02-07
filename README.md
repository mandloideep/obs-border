# obs-border

# How to Use the Animated Border in OBS

Add it as a **Browser Source** with a local file URL like:

```text
https://mandloideep.github.io/obs-border/?shape=circle&w=65&h=85&animation=dash&speed=3&colors=6366f1,8b5cf6,a78bfa
```

## Parameters you can tweak:

| Param | Default | Description |
| --- | --- | --- |
| `shape` | `rect` | `rect` or `circle` (circle for camera bubble) |
| `w` | 90 | Width as % of browser source |
| `h` | 85 | Height as % of browser source |
| `r` | 16 | Border radius (px) |
| `thickness` | 3 | Border width |
| `speed` | 3 | Animation cycle in seconds |
| `animation` | `dash` | `dash`, `rotate`, or `pulse` |
| `colors` | purple gradient | Comma-separated hex (no #) |
| `glow` | true | Adds soft glow behind border |
| `opacity` | 0.85 | Overall opacity |

