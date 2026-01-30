import React from 'react';
import './NatureElements.css';
import leafSvg from '../assets/svg/leaf.svg';
import flowerSvg from '../assets/svg/flower.svg';
import beeSvg from '../assets/svg/bee.svg';

function NatureElements() {
  return (
    <>
      {/* Fallande löv */}
      <div className="falling-leaves">
        <img src={leafSvg} alt="" className="leaf leaf-1" />
        <img src={leafSvg} alt="" className="leaf leaf-2" />
        <img src={leafSvg} alt="" className="leaf leaf-3" />
        <img src={leafSvg} alt="" className="leaf leaf-4" />
        <img src={leafSvg} alt="" className="leaf leaf-5" />
      </div>

      {/* Flygande bin */}
      <div className="flying-bees">
        <img src={beeSvg} alt="" className="bee bee-1" />
        <img src={beeSvg} alt="" className="bee bee-2" />
      </div>

      {/* Dekorativa blommor i hörnen */}
      <div className="decorative-flowers">
        <img src={flowerSvg} alt="" className="flower flower-top-right" />
        <img src={flowerSvg} alt="" className="flower flower-bottom-left" />
      </div>
    </>
  );
}

export default NatureElements;
