# Reverse Engineering

## Prerequisits

1. Setup Android Env by following the doc => docs\FbWelcome.md
2. Install Mandatory => Adb, apktool, jadx
3. Install Optional => Dex2Jar, Jd-gui, Radare2, strings

### Adb commands

```bash
1. adb shell
2. pm list packages
3. grep <search-text>
4. pm path <path-of-the-package>
5. exit => will exit from shell
```

Go to the folder you want to copy the apk on the computer

```bash
6. adb pull <path-of-the-package> <destination-path-to-be-copied> => will copy the apk to the current folder the cmd is open
```

### Decompiling apk and exploring source code

#### Exploring Java/kotlin code

1. Decompile the apk with the below command

```bash
- apktool d <input-path.apk> <output-name>
```

2. Load the decompiled folder in Jadx tool to view smali & source code side by side

#### Exploring C++ code

- Check References section
- With Gidra Decompiler it is easy to read code. Refer #3 video in the Youtube playlist
- Cutter UI. Refer #6
- Rizin. Refer #7
- Iaito. Refer #8

#### Exploring Javscript code

- WIP

## References

- [Youtube, Android Reversing #1](https://youtu.be/uc7eZGE07ps?si=cuH9eJsH1VEYbKN1) - Follow up #2, #3 and other videos on the channel
- [Blog, Intro to Android mobile Reverse Engineering](https://www.corellium.com/blog/android-mobile-reverse-engineering)
- [Youtube, C++ Reversing using Radare2](https://youtu.be/RbIxKM2QW8s?si=Bm0Bm8uS0mmurMW-)
- [GitHub, Radare2 official link](https://github.com/radareorg/radare2)
