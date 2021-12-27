import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/ayu-dark.css';
import 'codemirror/theme/base16-light.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/hint/show-hint.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/mode/xml/xml';
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/python/python";
import "codemirror/mode/clike/clike";
import "codemirror/mode/go/go";
import 'codemirror/addon/lint/javascript-lint';
import 'codemirror/addon/lint/lint.js';
import 'codemirror/addon/hint/javascript-hint';
import "../App.css"
import { JSHINT } from 'jshint';
window.JSHINT = JSHINT;


const CodeEditor = (props) => {
  const {language, value, onChange, theme} = props;

  const beforeChangeHandler = (editor, data, value) => {
    onChange(value);
  }

  const onChangeHandler = (editor, data, value) => {

  }

  return (
    <React.Fragment>
        <CodeMirror
          value={value}
          className="h-full"
          options={{
            lineWrapping: true,
            lint: true,
            mode: (language === "java" ? "clike" : language),
            lineNumbers: true,
            theme: theme,
          }}
          onBeforeChange={beforeChangeHandler}
          onChange={onChangeHandler}
        />
    </React.Fragment>
  );
};

export default CodeEditor;
