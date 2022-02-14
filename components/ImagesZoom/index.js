import React, {useState} from 'react';
import PropTypes from "prop-types";
import Slick from 'react-slick'

/*
indicator
div
textAlign: 'centor'

>div
width: '75px',
height: '30px',
lineHeight: '30px',
borderRadius: '15px',
background: '#313131',
display: 'inlineBlock',
textAlign: 'centor',
color: 'white',
fontSize: '15px',
 */

const ImagesZoom = ({images, onClose}) => {
    const [currentSlide,setCurrentSlide] = useState(0)

    return(
        <div style={{ position: "fixed", zIndex: 5000, top:0, left:0, right:0, bottom:0 }}>
            <header style={{header: '44px', background: 'white', position: 'relative', padding: 0, textAlign: 'center' }}>
                <h1 style={{margin: 0, fontSize: '17px', color: '#333', lineHeight: "44px"}}>상세이미지</h1>
                <button style={{
                    position: 'absolute',
                    right: '0',
                    left: '0',
                    top: '0',
                    padding: '15px',
                    lineHeight: '14px',
                    cursor: 'pointer'
                }} onClick={onClose}>X</button>
            </header>
            <div>
                <div style={{
                    height: '750px',
                    background: '#898989'
                }}>
                    <Slick

                        initialSlide={0}
                        afterChange={(slide)=>setCurrentSlide(slide)}
                        infinite
                        arrows={false}
                        slidesToShow={1}
                        slidesToScroll={1}
                    >
                        {
                            images.map((v)=>(
                                <div style={{
                                    padding: '32px',
                                    textAlign: 'center'
                                }} key={v.src}>
                                    <img style={{
                                        margin: '0 auto',
                                        maxHeight: '750px'
                                    }} src={v.src} alt={v.src}/>
                                </div>
                            ))
                        }
                    </Slick>
                </div>
            </div>
        </div>
    )
}

ImagesZoom.propTypes = {
    images: PropTypes.arrayOf(PropTypes.object).isRequired,
    onClose: PropTypes.func.isRequired,
}

export default ImagesZoom;