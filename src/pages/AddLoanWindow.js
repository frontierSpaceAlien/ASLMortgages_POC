import React, { useState } from 'react';

function PopupForm(props) {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');
  const [input4, setInput4] = useState('');
  const [input5, setInput5] = useState('');
  const [input6, setInput6] = useState('');
  const [input7, setInput7] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // 处理提交表单的逻辑
    // 使用 input1 - input7 的值
    // ...
    // 关闭弹窗窗口
    props.onClose();
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <form onSubmit={handleSubmit}>
          <label>
            Description 1:
            <input type="text" value={input1} onChange={e => setInput1(e.target.value)} />
          </label>
          <label>
            Description 2:
            <input type="text" value={input2} onChange={e => setInput2(e.target.value)} />
          </label>
          <label>
            Description 3:
            <input type="text" value={input3} onChange={e => setInput3(e.target.value)} />
          </label>
          <label>
            Description 4:
            <input type="text" value={input4} onChange={e => setInput4(e.target.value)} />
          </label>
          <label>
            Description 5:
            <input type="text" value={input5} onChange={e => setInput5(e.target.value)} />
          </label>
          <label>
            Description 6:
            <input type="text" value={input6} onChange={e => setInput6(e.target.value)} />
          </label>
          <label>
            Description 7:
            <input type="text" value={input7} onChange={e => setInput7(e.target.value)} />
          </label>
          <div className="button-container">
            <button type="submit">Submit</button>
            <button type="button" onClick={props.onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupForm;
