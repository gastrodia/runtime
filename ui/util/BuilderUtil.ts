import {IntegerUtil} from '../../common/lang/IntegerUtil';
import {StringUtil} from '../../common/lang/StringUtil';

//==========================================================
// <T>页面构建类。</T>
//
// @reference
// @author maocy
// @version 141229
//==========================================================
export class BuilderUtil {
   //==========================================================
   // <T>创建一个页面对象。</T>
   //
   // @method
   // @param hTag 页面元素
   // @param tagName 标签名称
   // @param styleName 样式名称
   // @return HtmlTag 页面对象
   //==========================================================
   public static create(hTag, tagName: string, styleName?: string) {
      var hDocument = null;
      if (hTag.ownerDocument) {
         hDocument = hTag.ownerDocument;
      } else if (hTag.hDocument) {
         hDocument = hTag.hDocument;
      } else {
         hDocument = hTag;
      }
      var hTag = hDocument.createElement(tagName);
      if (styleName) {
         hTag.className = styleName;
      }
      return hTag;
   }

   //==========================================================
   // <T>创建一个页面图标对象。</T>
   //
   // @method
   // @param hDocument:HtmlDocument 页面文档对象
   // @param style:String 样式名称
   // @param uri:String 图片路径
   // @param width:Integer 图片高度
   // @param height:Integer 图片宽度
   // @return HtmlImgTag 页面图标对象
   //==========================================================
   public static createIcon(hDocument, style, uri, width, height) {
      var hImage = this.create(hDocument, 'IMG', StringUtil.nvl(style, 'Tag_Icon'));
      hImage.align = 'absmiddle';
      if (uri) {
         // hImage.src = RResource.iconPath(uri);
      }
      if (width) {
         hImage.style.width = width + 'px';
      }
      if (height) {
         hImage.style.height = height + 'px';
      }
      return hImage;
   }

   //==========================================================
   // <T>创建一个页面图片对象。</T>
   //
   // @method
   // @param hDocument:HtmlDocument 页面文档对象
   // @param style:String 样式名称
   // @param uri:String 图片路径
   // @param width:Integer 图片高度
   // @param height:Integer 图片宽度
   // @return HtmlImgTag 页面图片对象
   //==========================================================
   public static createImage(hDocument, style, uri, width, height) {
      var hImage = this.create(hDocument, 'IMG', style);
      if (uri) {
         // hImage.src = RResource.imagePath(uri);
      }
      if (width) {
         hImage.style.width = width + 'px';
      }
      if (height) {
         hImage.style.height = height + 'px';
      }
      return hImage;
   }

   //==========================================================
   // <T>创建一个页面文本对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @param v:value:String 内容
   // @return HtmlInputTag 页面文本对象
   //==========================================================
   public static createText(d, s, v) {
      var r = this.create(d, 'SPAN', s);
      if (v) {
         r.innerHTML = v;
      }
      return r;
   }

   //==========================================================
   // <T>创建一个页面按钮对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面复选框对象
   //==========================================================
   public static createButton(d, s) {
      var r = this.create(d, "INPUT", s);
      r.type = 'button';
      return r;
   }

   //==========================================================
   // <T>创建一个页面复选框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面复选框对象
   //==========================================================
   public static createCheck(d, s) {
      var r = this.create(d, "INPUT", s);
      r.type = 'checkbox';
      return r;
   }

   //==========================================================
   // <T>创建一个页面单选框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面单选框对象
   //==========================================================
   public static createRadio(d, s) {
      var r = this.create(d, "INPUT", s);
      r.type = 'radio';
      return r;
   }

   //==========================================================
   // <T>创建一个页面编辑框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   public static createEdit(d, s) {
      var r = this.create(d, "INPUT", s);
      r.type = 'text';
      return r;
   }

   //==========================================================
   // <T>创建一个页面文件框对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   public static createFile(d, s) {
      var r = this.create(d, "INPUT", s);
      r.type = 'file';
      return r;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlSpanTag 页面浮动块对象
   //==========================================================
   public static createSpan(d, s) {
      return this.create(d, 'SPAN', s);
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:style:String 样式名称
   // @return HtmlDivTag 页面浮动块对象
   //==========================================================
   public static createDiv(d, s) {
      return this.create(d, 'DIV', s);
   }

   //==========================================================
   // <T>创建一个页面表格。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:styleName:String 样式名称
   // @param b:border:Integer 边框宽度
   // @param cs:cellSpaceing:Integer 单元格之间的宽度
   // @param cp:cellPadding:Integer 单元格内文字与单元格边框之间的距离
   // @return HtmlTag 表格对象
   //==========================================================
   public static createTable(d, s, b, cs, cp) {
      var h = this.create(d, 'TABLE', s);
      if (b) {
         h.border = IntegerUtil.nvl(b);
      }
      h.cellSpacing = IntegerUtil.nvl(cs);
      h.cellPadding = IntegerUtil.nvl(cp);
      return h;
   }

   //==========================================================
   // <T>创建一个页面表格行。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:styleName:String 样式名称
   // @return HtmlTrTag 表格行对象
   //==========================================================
   public static createTableRow(d, s) {
      var h = this.create(d, 'TR', s);
      return h;
   }

   //==========================================================
   // <T>创建一个页面表格格子。</T>
   //
   // @method
   // @param d:document:HtmlDocument 页面文档对象
   // @param s:styleName:String 样式名称
   // @return HtmlTdTag 表格格子对象
   //==========================================================
   public static createTableCell(d, s) {
      var h = this.create(d, 'TD', s);
      return h;
   }

   //==========================================================
   // <T>创建一个文档碎片。</T>
   //
   // @method
   // @param document:HtmlDocument 页面文档对象
   // @return HtmlTag 表格对象
   //==========================================================
   public static createFragment(document) {
      var hDocument = null;
      if (document.ownerDocument) {
         hDocument = document.ownerDocument;
      } else if (document.hDocument) {
         hDocument = document.hDocument;
      } else {
         hDocument = document;
      }
      var hElement = hDocument.createDocumentFragment();
      hElement.__fragment = true;
      return hElement;
   }

   //==========================================================
   // <T>追加一个页面对象，如果存在父容器就放在里面，没有就放在当前页面里。</T>
   //
   // @method
   // @param hTag 页面标签
   // @param tagName 标签名称
   // @param styleName 样式名称
   // @return 页面对象
   //==========================================================
   public static append(hTag, tagName, styleName) {
      var hResult = this.create(hTag.ownerDocument, tagName, styleName);
      if (hTag) {
         hTag.appendChild(hResult);
      } else {
         //this.hDocument.body.appendChild(r);
      }
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面图标对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @param u:url:String 图片路径
   // @param w:width:Integer 图片高度
   // @param h:height:Integer 图片宽度
   // @return HtmlImgTag 页面图标对象
   //==========================================================
   public static appendIcon(p, s, u, w, h) {
      var hResult = this.createIcon(p.ownerDocument, s, u, w, h);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面图片对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @param u:url:String 图片路径
   // @param w:width:Integer 图片高度
   // @param h:height:Integer 图片宽度
   // @return HtmlImgTag 页面图片对象
   //==========================================================
   public static appendImage(p, s, u, w, h) {
      var hResult = this.createImage(p.ownerDocument, s, u, w, h);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个空白页面图标对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HTML html容器
   // @param w:width:Integer 图片的显示宽度
   // @param h:height:Integer 图片的显示宽度
   // @return HtmlImgTag 空白页面图标对象
   //==========================================================
   public static appendEmpty(p, w, h) {
      var hResult = this.createIcon(p.ownerDocument, null, 'n', w, h);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面文本对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @param v:value:String 内容
   // @return HtmlInputTag 页面文本对象
   //==========================================================
   public static appendText(p, s, v) {
      var hResult = this.createText(p.ownerDocument, s, v);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面按钮对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面按钮对象
   //==========================================================
   public static appendButton(p, s) {
      var hResult = this.createButton(p.ownerDocument, s);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面复选框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面复选框对象
   //==========================================================
   public static appendCheck(p, s) {
      var hResult = this.createCheck(p.ownerDocument, s);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面单选框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面单选框对象
   //==========================================================
   public static appendRadio(p, s) {
      var hResult = this.createRadio(p.ownerDocument, s);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面编辑框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   public static appendEdit(p, s) {
      var hResult = this.createEdit(p.ownerDocument, s);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面文件框对象，放在父容器里面，并返回这个对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlInputTag 页面编辑框对象
   //==========================================================
   public static appendFile(p, s) {
      var hResult = this.createFile(p.ownerDocument, s);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlSpanTag 页面浮动块对象
   //==========================================================
   public static appendSpan(p, s) {
      var hResult = this.createSpan(p.ownerDocument, s);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>创建一个页面浮动块对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:style:String 样式名称
   // @return HtmlDivTag 页面浮动块对象
   //==========================================================
   public static appendDiv(p, s) {
      var hResult = this.createDiv(p.ownerDocument, s);
      p.appendChild(hResult);
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面表格对象，放在父容器里面，并返回这个表格对象。</T>
   //
   // @method
   // @param p:parent:HtmlTag 页面标签
   // @param s:styleName:String 样式名称
   // @param b:border:Integer 边框宽度
   // @param cs:cellSpaceing:Integer 单元格之间的宽度
   // @param cp:cellPadding:Integer 单元格内文字与单元格边框之间的距离
   // @return HtmlTag 表格对象
   // @see MO.Window.Builder.createTable
   //==========================================================
   public static appendTable(p, s, b, cs, cp) {
      var hResult = this.createTable(p.ownerDocument, s, b, cs, cp);
      if (p) {
         p.appendChild(hResult);
      } else {
         //this.hDocument.body.appendChild(r);
      }
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @method
   // @param p:parent:HtmlTableTag 表格容器
   // @param s:styleName:String 样式名称
   // @param i:index:Integer 索引位置
   // @param w:width:Integer 行宽度
   // @param h:height:Integer 行高度
   // @return HtmlTrTag 页面行对象
   //==========================================================
   public static appendTableRow(p, s, i, h) {
      var hResult = null;
      if (i == null) {
         //if (RBrowser.isBrowser(EBrowser.Explorer)) {
         hResult = p.insertRow();
         //} else {
         //   r = p.insertRow(-1);
         //}
      } else {
         hResult = p.insertRow(i);
      }
      if (s) {
         hResult.className = s;
      }
      if (h) {
         hResult.height = h;
      }
      return hResult;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @method
   // @param p:parent:HtmlTableTag 表格容器
   // @param s:styleName:String 样式名称
   // @param w:width:Integer 行宽度
   // @param h:height:Integer 行高度
   // @return HtmlTrTag 页面行对象
   //==========================================================
   public static appendTableRowCell(p, s, w, h) {
      var hr = this.appendTableRow(p, null, null, w);
      var hc = this.appendTableCell(hr, s, null, h);
      return hc;
   }

   //==========================================================
   // <T>追加一个页面行对象，并返回这个页面行对象。</T>
   //
   // @method
   // @param p:parent:HtmlTableTag 表格容器
   // @param s:styleName:String 样式名称
   // @param i:index:Integer 索引位置
   // @param w:width:Integer 行宽度
   // @param h:height:Integer 行高度
   // @return HtmlTrTag 页面行对象
   //==========================================================
   public static appendTableCell(p, s, i, w) {
      var r = null;
      if (i == null) {
         r = this.create(p, 'TD', s);
         p.appendChild(r);
         //if(RBrowser.isBrowser(MO.EBrowser.Explorer)){
         //   r = p.insertCell();
         //}else{
         //   r = p.insertCell(-1);
         //}
      } else {
         r = p.insertCell(i);
      }
      if (s) {
         r.className = s;
      }
      if (w) {
         r.width = w;
      }
      return r;
   }
}
