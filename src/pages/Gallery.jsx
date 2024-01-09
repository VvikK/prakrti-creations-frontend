import React from 'react';
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry";

import "../styles/theme.css";
import "../styles/gallery.css";

function Gallery() {
    const context = require.context("../images/gallery", false, /\.(png|jpe?g|svg)$/);
    const images = context.keys().map(image => context(image));

    return (
        <>
        <div class="box">
            <ResponsiveMasonry columnsCountBreakPoints={{350: 1, 600: 2, 900: 3, 1150: 4}}>
                <Masonry gutter="20px">
                    {images.map((image, i) => (<img key={i} src={image} style={{width: "100%", display: "block"}} alt="" onClick={null}/>))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
        </>
    );
};

export default Gallery;
