from django.shortcuts import render

# Create your views here.
def post_detail(request, slug):
    post = get_object_or_404(Post, slug=slug)

    session_key = f'viewed_post_{post.id}'  # یه کلید اختصاصی برای این پست توی session

    if not request.session.get(session_key, False):  # اگه این پست رو هنوز تو این سشن ندیده
        post.views += 1                              # بازدید +1
        post.save()                                  # ذخیره در دیتابیس
        request.session[session_key] = True          # علامت بزن که این پست دیده شده

    return render(request, 'blog/post_detail.html', {'post': post})
