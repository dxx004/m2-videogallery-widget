<?php

namespace RVSolutions\VideoGalleryWidget\Block\Widget;

use Magento\Framework\View\Element\Template;
use Magento\Widget\Block\BlockInterface;

/**
 * Convert class to be used in template
 */
class Convert extends Template implements BlockInterface
{
    /**
     * @var string
     */
    protected $_template = "widget/convert.phtml";
}
