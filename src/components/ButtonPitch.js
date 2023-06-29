import { useState } from 'react';

const ButtonPitch = ({pitch,setPitch}) => {

  //State
  const [pitchState,setPitchState] = useState('3D');
  
  //change pitch and text button text
  const handlePitch = () => {
    setPitch(!pitch);

    if(!pitch){
      setPitchState('2D')
    }else{
      setPitchState('3D')
    }
  }

  return (
    <div className="absolute top-28 ml-[72.2%] rounded-lg bg-white p-2 text-gray-500 drop-shadow-lg border-[1px] hover:bg-gray-200 text-[80%]">
        <button 
          type='button' 
          onClick={handlePitch}>
          {pitchState}
        </button>
    </div>
  );
};

export default ButtonPitch;
  
  