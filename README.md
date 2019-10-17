# m2-videogallery-widget
Magento 2 module - VideoGallery widget


## Installation
Install via composer (recommend): Run the following command in Magento 2 root folder:
```
composer require dxx004/m2-videogallery-widget
php bin/magento setup:upgrade
php bin/magento setup:static-content:deploy
```

## Usage
In CMS Page or Block, add any container with element ID, and then add list of youtube videos as child elements, example:
```
<ul id="test-videogallery">
    <li>https://www.youtube.com/watch?v=PhA0iyto4JA</li>
    <li>https://www.youtube.com/watch?v=9A1QZHLHwr8</li>
    <li>https://www.youtube.com/watch?v=yUVU6LZt2Bo</li>
</ul>
```

Then insert widget with "Insert widget"

or

add HTML
```
<div>{{widget type="RVSolutions\VideoGalleryWidget\Block\Widget\Convert" container_id="test-videogallery"}}</div>
```
where *container_id* is ID of video-gallery element from above.