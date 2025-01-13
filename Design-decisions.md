# Terminology:
**target application** - the Ruby on Rails application, which uses Bootsy gem. This particular fork is
tailored for one particular application only!

**foreign file** - a file which is not hosted in target application's backend. Instead it's stored on
some other server and is only referenced by Bootsy.


13.01.2025
Arman Yerkesh

Foreign images naturally don't have variants. So, the workaround is to use "width" and "height" on
<img> to make an appearance of a variant. So, why not do the same for all images and not bother with
variants altogether? The reasoning for keeping image variants is that
1. variants give some performance optimization
2. variants are already automatically created when images are uploaded to the target application



06.01.2025
Arman Yerkesh

Because default Bootsy images are page-specific and cannot be reused, modifications were made
to allow usage of images, uploaded to the target application. After some time it became evident that
page-specific images don't have any use case, which can't be covered by global images. Thus, support
for page-specific images was dropped.