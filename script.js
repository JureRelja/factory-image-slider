$(document).ready(function () {

    const columnGap = parseInt($(".slider-row-upper-inner").css('column-gap')) // Column gap is the same for the upper and lower slider rows

    let upperSliderRow = $('.slider-row-upper'); // Getting the upper slider row
    let upperSliderRowInner = $(".slider-row-upper-inner") // Getting the inner div of the upper slider row
    let upperImages = $('.upper-slider-image'); // Getting all the images of the upper slider row
    let upperImagesWidth = $(".slider-row-upper-inner").width(); // Getting the width of the inner div of the upper slider row

    let lowerSliderRow = $('.slider-row-lower'); // Getting the lower slider row
    let lowerSliderRowInner = $(".slider-row-lower-inner") // Getting the inner div of the lower slider row
    let lowerImages = $('.lower-slider-image'); // Getting all the images of the lower slider row
    let lowerImagesWidth = $(".slider-row-lower-inner").width(); // Getting the width of the inner div of the lower slider row

    upperSliderRow.css('width', upperImagesWidth + 'px') // Setting the width of the upper slider row to the width of visible images
    lowerSliderRow.css('width', lowerImagesWidth + 'px') // Setting the width of the lower slider row to the width of visible images

    //Function for setting the initial overflow images on the left and right of the visible images
    const setInitialOverflowImgs = (lastImg, firstImg, sliderRowInner) => {
        lastImg.clone().insertBefore(firstImg);
        firstImg.clone().insertAfter(lastImg);
        sliderRowInner.css('left', -lastImg.width() - columnGap + 'px'); 
    }

    setInitialOverflowImgs(upperImages.last(), upperImages.first(), upperSliderRowInner) // Calling setInitialOverflowImgs function for upper slider

    setInitialOverflowImgs(lowerImages.last(), lowerImages.first(), lowerSliderRowInner) // Calling setInitialOverflowImgs function for upper slider

    //Changing the arrow images on hover
    let leftBtn = $('#left-button');
    let rightBtn = $('#right-button');

    rightBtn.on('mouseenter', function () {
        rightBtn.children("img").attr('src', './assets/arrow-gray-right.png');
    }).on('mouseleave', function () {
        rightBtn.children("img").attr('src', './assets/arrow-blue-right.png');
    });

    leftBtn.on('mouseenter', function () {
        leftBtn.children("img").attr('src', './assets/arrow-gray-left.png');
    }).on('mouseleave', function () {
        leftBtn.children("img").attr('src', './assets/arrow-blue-left.png');
    });


    rightBtn.on('click', function () {
        //Upper slider
        let upperSliderItm = $(".upper-slider-image");
        let upperCurrentImage = upperSliderItm.last().prev()

        rightBtnClick(upperSliderItm, upperCurrentImage, upperSliderRowInner) //Calling rightBtnClick slider handler function for upper slider
        
        //Lower slider
        let lowerSliderItm = $(".lower-slider-image");
        let lowerCurrentImage = lowerSliderItm.last().prev()

        rightBtnClick(lowerSliderItm, lowerCurrentImage, lowerSliderRowInner) //Calling rightBtnClick slider handler function for lower slider

    })

    // Slider handler function for right button click
    const rightBtnClick = (sliderItem, currentImg, sliderRowInner) => {
        sliderRowInner.animate({ left: 0 + "px" }, 300, function () {
            currentImg.remove(); // Delting the image that has just left the screen on the right

            let newLastImg = sliderItem.last().prev() //Getting the new visible image that is most right
            let newFirstImg = sliderItem.first()  // Getting the new visible image that is most left

            newLastImg.clone().insertBefore(newFirstImg); // Inserting the new image that is most right before the first image that now visible on the left. This new image will overflow on the left
            sliderItem.last().replaceWith(newFirstImg.clone());  // Replacing the last image that is overflowing on the right with the new image that is most left
            
            sliderRowInner.css('left', -newLastImg.width() - columnGap + 'px'); // Setting the left position of the slider to the negative width of the new first image that is overflowing on the left

         });
    }


    leftBtn.on('click', function () {
        //Upper slider
        let upperSliderItm = $(".upper-slider-image");
        let upperCurrentImage = upperSliderItm.first().next()

        let currentUpInnerLeft = $(".slider-row-upper-inner").css('left') // Getting the current left position of the inner div of the upper slider row
        let newLeftUpper = parseInt(currentUpInnerLeft) - upperCurrentImage.width() - columnGap 

        leftBtnClick(upperSliderItm, upperCurrentImage, upperSliderRowInner, newLeftUpper) //Calling leftBtnClick slider handler function for upper slider

        //Lower slider
        let lowerSliderItm = $(".lower-slider-image");
        let lowerCurrentImage = lowerSliderItm.first().next()

        let currentLowInnerLeft = $(".slider-row-lower-inner").css('left') // Getting the current left position of the inner div of the lower slider row
        let newLeftLower = parseInt(currentLowInnerLeft) - lowerCurrentImage.width() - columnGap 

        leftBtnClick(lowerSliderItm, lowerCurrentImage, lowerSliderRowInner, newLeftLower) //Calling leftBtnClick slider handler function for lower slider

    });

    const leftBtnClick = (sliderItem, currentImg, sliderRowInner, newLeft) => {
        sliderRowInner.animate({ left: newLeft + "px" }, 300, function () {
            currentImg.remove(); // Delting the image that has just left the screen on the left
                
            let newLastImg = sliderItem.last() //Getting the new visible image that is most right
            let newFirstImg = sliderItem.first().next() // Getting the new visible image that is most left
    
            newFirstImg.clone().insertAfter(newLastImg) // Inserting the new image that is most left after the last image that is most right. This new image will overflow on the right
            sliderItem.first().replaceWith(newLastImg.clone()); // Replacing the first image that is overflowing on the left with the new image that is most right 
            
            sliderRowInner.css('left', -newLastImg.width() - columnGap + 'px'); // Setting the left position of the slider to the negative width of the new first image that is overflowing on the left
         });
    }

});



