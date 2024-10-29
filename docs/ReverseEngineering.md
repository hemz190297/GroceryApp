# Reverse Engineering

## Adb commands

```bash
1. adb shell
2. pm list packages
3. grep <search-text>
4. pm path <path-of-the-package>
5. exit => will exit from shell
```

Go to the folder you want to copy the apk on the computer

```bash
6. adb pull <path-of-the-package> => will copy the apk to the current folder the cmd is open
```

## Reverse Engineering

```bash
- apktool d <input-path.apk> <output-name.apk>
```

## References

- [Youtube, Android Reversing #1](https://youtu.be/uc7eZGE07ps?si=cuH9eJsH1VEYbKN1) - Follow up #2, #3 and other videos on the channel
- [Blog, Intro to Android mobile Reverse Engineering](https://www.corellium.com/blog/android-mobile-reverse-engineering)
