$(document).ready(function () {

    const columnGap = parseInt($(".slider-row-upper-inner").css('column-gap')) // Column gap is the same for the upper and lower slider rows

    const upperSliderRowInner = $(".slider-row-upper-inner") // Getting the inner div of the upper slider row
   
    const lowerSliderRowInner = $(".slider-row-lower-inner") // Getting the inner div of the lower slider row

    const leftBtn = $('#left-button');
    const rightBtn = $('#right-button');

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

    let animating = false;

    rightBtn.on('click', function () {
        if (animating) return; // If the slider is animating, do not allow the user to click the button again

        animating = true; // Setting animating to true to prevent the user from clicking the button again

        //Upper slider
        const upperSliderItm = $(".upper-slider-image"); // Getting all the images of the upper slider
        const upperCurrentImage = upperSliderItm.first() // Getting the most right image of the upper slider

        rightBtnClick(upperSliderItm, upperCurrentImage, upperSliderRowInner) //Calling rightBtnClick slider handler function for upper slider
        
        //Lower slider
        const lowerSliderItm = $(".lower-slider-image"); // Getting all the images of the lower slider
        const lowerCurrentImage = lowerSliderItm.first() // Getting the most right image of the lower slider

        rightBtnClick(lowerSliderItm, lowerCurrentImage, lowerSliderRowInner) //Calling rightBtnClick slider handler function for lower slider
    })

    // Slider handler function for right button click
    const rightBtnClick = (sliderItem, currentImg, sliderRowInner) => {
        sliderRowInner.animate({ left: currentImg.width() + columnGap + "px" }, 300, function () {

            sliderRowInner.css('left', 0 + 'px');

            currentImg.insertBefore(sliderItem.last()); // Inserting the image that has overflown on the right before the image that is overflowing on the left

            animating = false; // Setting animating to true to prevent the user from clicking the button again
         });
    }


    leftBtn.on('click', function () {
        if (animating) return; // If the slider is animating, do not allow the user to click the button again

        animating = true; // Setting animating to true to prevent the user from clicking the button again

        //Upper slider
        const upperSliderItm = $(".upper-slider-image"); // Getting all the images of the upper slider
        const upperCurrentImage = upperSliderItm.last() // Geting the uper slider overflowing image that is most left

        leftBtnClick(upperSliderItm, upperCurrentImage, upperSliderRowInner) //Calling leftBtnClick slider handler function for upper slider

        //Lower slider
        const lowerSliderItm = $(".lower-slider-image");
        const lowerCurrentImage = lowerSliderItm.last() // Geting the lower slider overflowing image that is most left

        leftBtnClick(lowerSliderItm, lowerCurrentImage, lowerSliderRowInner) //Calling leftBtnClick slider handler function for lower slider
    });

    const leftBtnClick = (sliderItem, currentImg, sliderRowInner) => {
        sliderRowInner.animate({ left: -currentImg.width() - columnGap + "px" }, 300, function () {
            
            sliderRowInner.css('left', 0 + 'px'); // Setting the left position of the slider to the negative width of the new first image that is overflowing on the left

            const newRightImg = currentImg.insertBefore(sliderItem.first()) // Inserting the image that has overflown on the left before the image that is most right
            
            newRightImg.css('display', 'none') // Hiding the inserted image
            
            newRightImg.fadeIn() //Fading in the inserted image
            
            animating = false; // Setting animating to true to prevent the user from clicking the button again
        });
    }
});



