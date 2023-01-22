# Photo Collage using WeakRef and FinalizationRegistry

---

## Description.
The purpose of this repo is to show how to use WeakRef and FinalizationRegistry in real-life scenarios.
1. Run the project and open the developer console in the browser.
2. Select several images by clicking on them with the mouse (you should see that selected images are highlighted with the border and checkmark), then click the "Create Collage" button.
3. Deselect some of the selected images (not all, just a small part), select other images, and click the "Create collage" button again.

Repeat this flow a few times (without page reloading), and pay attention to the messages in your browser's developer console:

| Message                                                                                                                                           | Description                                                                                                                                                                                                                                                       |
|:---------------------------------------------------------------------------------------------------------------------------------------------------:|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span style="margin: 8px; font-size: 16px; padding: 8px; border: 2px solid #5a5a5a; color: white; background-color: #13315a">FETCHED_IMAGE</span> | Indicates that this image to create a collage was downloaded from the network                                                                                                                                                                                     |
| <span style="font-size: 16px; padding: 8px; border: 2px solid #5a5a5a; color: white; background-color: #5a1a24">CLEANED_IMAGE</span>              | Indicates that the reference object stored in the cache, which we refer to, using a weak reference (object with the image), was released, and our finalizer fulfilled successfully, thereby deleting the key by which the image was stored in the cache.          |
| <span style="font-size: 16px; padding: 8px; border: 2px solid #5a5a5a; color: white; background-color: #385a4e">CACHED_IMAGE</span>                                                                                                                                     | This means that at the time of the collage creation, the garbage collector had not yet deleted our image, and we boldly used it from the cache, thereby reducing the number of network requests and speeding up the overall time of the collage creation process. |

---

## Run the project.

1. Clone this repo.
2. Install dependencies with the: `npm install`.
3. Run the project with the `npm run start`.
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

---

## Useful links.

1. [Online Demo](https://weakref-photo-collage.onrender.com).
2. [Demo GitHub repository](https://github.com/WOLFRIEND/WeakRef-Photo-Collage).
3. [Report diagram](https://miro.com/app/board/uXjVP1npGa4=/).
4. [WeakRefs and FinalizationRegistry TC39 proposal](https://github.com/tc39/proposal-weakrefs/blob/master/README.md#weakrefs-tc39-proposal).
5. [WeakRefs and FinalizationRegistry developers reference](https://github.com/tc39/proposal-weakrefs/blob/master/reference.md#introduction).
6. [MDN WeakRef](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef). 
7. [MDN FinalizationRegistry](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry).