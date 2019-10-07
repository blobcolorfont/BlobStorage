# Guidelines for Blob Color Font emoji
**NOTE:** The guideline is heavily work in progress, parts might be missing and some emojis have not been changed to adapt to it.

----------

To make an emoji for the Blob Color Font project, some guidelines have to be followed.

## Principles
There's an important principle when making the emoji set which when possible, it should be followed:
- Even your grandma can use the emojis and trust what it actually means when sending one.

This means that this emoji set should be like what other emoji sets show as close as possible while trying to keep the blob style, the huge differences between other sets were a fatal flaw on the original Noto Color Emoji, which was one of the main reasons that it got criticized and also that it got redesigned.

## Emoji Sources
When making an emoji, first, you must know how the other emoji sets did it, [Emojipedia](https://emojipedia.org) can be used to compare the best way to represent the emoji, the most popular ones should be the ones to be compared, you can ignore the bottom ones, they are usually the oldest ones.

When comparing, you should never pick a single emoji set as the base, for example, if Apple suddently changes their emoji, do not immediately change to it, only change when absolutely sure that all the major emoji sets moved to it, then it's safe to change to it, and you should never directly use other emoji set assets, pre-nougat Google emoji are an expection, but adaptation is necessary.

Failure to compare other emoji sets or just comparing one while making an emoji might not matter, but it can lead to cases like [this](https://emojipedia.org/google/android-4.4/yellow-heart/), which violates the principle of making an emoji set that anyone can use without being confused because of drastic differences.

## Color
The colors are generally either picked from Google's original emojis or from this project's other emojis, if there's one that isn't suited for an emoji and aren't on both, a derivative can be created with a similar color as base, if a darker or lighter color is required, [this tool](https://material.io/design/color/the-color-system.html#tools-for-picking-colors) from Material Design's website should be used.

The colors for smileys and people are strict, for smileys because of consistency and for people also because of consistency **and** because the build system automatically converts the generic skin colors to the other ones and if the wrong color is used, it won't be converted.

These are the definitive colors for smileys:
- `#FCC21B` - Base & hand color
- `#2F2F2F` - Face & outline color (replaces pure black)
- `#ED6C30` - Open mouth color
- `#D7598B` - Tongue color

These are the definitive colors for people:
- `#FCC21B` - Generic skin color
- `#513F35` - Mouth color (with exception of Bearded Man)
- `#FFA000` - Generic hair color
- `#E59900` - Generic neck color
- `#E59600` - Generic nose and ear color
- `#E48C15` - Secondary nose color (To be replaced)
- `#00ACC1` - Male shirt
- `#7E57C2` - Female shirt

And these are the definite colors for hands, gestures and body parts:
- `#FAC036` - Skin color
- `#E48C15` - Secondary skin color