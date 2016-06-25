import {AssertUtil} from '../common/AssertUtil';
import {Fatal} from '../common/lang/Fatal';
import {ServiceUtil} from '../core/ServiceUtil';
import {Component} from './Component';
import {Event} from './event/Event';
import {EventService} from './service/EventService';
import {BuilderUtil} from './util/BuilderUtil';
import {HtmlUtil} from './util/HtmlUtil';

//==========================================================
// <T>控件的基类。</T>
// <P>支持控件的样式、建立、显示、设计、模式功能。</P>
//
//  hParent<TAG>
// ┌-------------------┐
// │ hContainer<DIV>   │
// │┌---------------┐│
// ││Control        ││
// │└---------------┘│
// └-------------------┘
//
// @class
// @author maocy
// @version 141231
//==========================================================
export class Control extends Component {
   //..........................................................
   // @property Boolean 是否可见
   public _visible: boolean = true;
   // @property Boolean 是否禁止
   public _disable: boolean = false;
   // @property EUiDock 停靠方式
   // public _dockCd        = MO.Class.register(o, [new MO.APtyString('_dockCd'), new MO.AGetSet('_dockCd')], MO.EUiDock.LeftTop);
   // @property EUiAnchor 锚点方式
   // public _anchorCd      = MO.Class.register(o, [new MO.APtyString('_anchorCd'), new MO.AGetSet('_anchorCd')], MO.EUiAnchor.None);
   // @property String 提示信息
   public hint: string;
   // // @property
   // o._nowrap = MO.Class.register(o, [new MO.APtyBoolean('_nowrap'), new MO.AGetSet('_nowrap')]);
   // o._foreColor = MO.Class.register(o, [new MO.APtyString('_foreColor'), new MO.AGetSet('_foreColor')]);
   // o._foreFont = MO.Class.register(o, [new MO.APtyString('_foreFont'), new MO.AGetSet('_foreFont')]);
   // o._backColor = MO.Class.register(o, [new MO.APtyString('_backColor'), new MO.AGetSet('_backColor')]);
   // o._backFont = MO.Class.register(o, [new MO.APtyString('_backFont'), new MO.AGetSet('_backFont')]);
   // //..........................................................
   // // @style
   // o._stylePanel = MO.Class.register(o, new MO.AStyle('_stylePanel'));
   // // @style
   // //o._styleDesign = MO.Class.register(o, new MO.AStyle('Design'));
   // // @style
   // //o._styleDesignHover = MO.Class.register(o, new MO.AStyle('DesignHover'));
   // // @style
   // //o._styleDesignDrag  = MO.Class.register(o, new MO.AStyle('DesignDrag'));
   // // @style
   // //o._styleDesignMove  = MO.Class.register(o, new MO.AStyle('DesignMove'));
   // //..........................................................
   // // @attribute
   // o._layoutCd = MO.EUiLayout.Display;
   // o._sizeCd = MO.EUiSize.Normal;
   // @attribute
   protected _statusVisible = true;
   protected _statusEnable = true;
   protected _statusBuild = false;
   protected _statusBuilded = false;
   // o._storage = null;
   // //o._events      = null;
   //..........................................................
   // @html 父容器
   protected _hParent;
   // @html 面板容器
   protected _hPanel;
   // //..........................................................
   // // @event
   // o.onEnter = MO.Class.register(o, new MO.AEventMouseEnter('onEnter'), MO.FDuiControl_onEnter);
   // o.onLeave = MO.Class.register(o, new MO.AEventMouseLeave('onLeave'), MO.FDuiControl_onLeave);
   // //o.onMouseOver    = MO.Class.register(o, new MO.AEventMouseOver('onMouseOver'));
   // //o.onMouseOut     = MO.Class.register(o, new MO.AEventMouseOut('onMouseOut'));
   // //o.onMouseDown    = MO.Class.register(o, new MO.AEventMouseDown('onMouseDown'));
   // //o.onMouseUp      = MO.Class.register(o, new MO.AEventMouseUp('onMouseUp'));
   // //o.onClick        = MO.Class.register(o, new MO.AEventClick('onClick'));
   // //o.onDoubleClick  = MO.Class.register(o, new MO.AEventDoubleClick('onDoubleClick'));
   // //o.onResize       = MO.Class.register(o, new MO.AEventResize('onResize'));

   //==========================================================
   // <T>构造处理。</T>
   //
   // @method
   //==========================================================
   public constructor() {
      super();
   }

   //==========================================================
   // <T>创建一个控件容器。</T>
   // <P>默认为DIV页面元素。</P>
   //
   // @method
   // @param p:event:MO.SUiDispatchEvent 事件处理
   //==========================================================
   public onBuildPanel(p) {
      this._hPanel = BuilderUtil.createDiv(p, this.styleName('Panel'));
   }

   //==========================================================
   // <T>建立显示框架。</T>
   //
   // @method
   // @param argements 参数集合
   //==========================================================
   public onBuild(p) {
      // 建立控件容器
      this.onBuildPanel(p);
      // 设置可见性
      if (this._statusVisible != this._visible) {
         this.setVisible(this._visible);
      }
      // 设置容器样式
      var hPanel = this._hPanel;
      HtmlUtil.linkSet(hPanel, 'control', this);
      // 关联容器事件
      //this.attachEvent('onEnter', hPanel);
      //this.attachEvent('onLeave', hPanel);
      //o.attachEvent('onMouseOver', h);
      //o.attachEvent('onMouseOut', h);
      //o.attachEvent('onMouseDown', h);
      //o.attachEvent('onMouseUp', h);
      //o.attachEvent('onClick', h);
      //o.attachEvent('onDoubleClick', h);
      //o.attachEvent('onKeyDown', h);
      //o.attachEvent('onKeyPress', h);
      //o.attachEvent('onKeyUp', h);
      //o.attachEvent('onResize', h);
      // 设置容器位置/大小/空白
      //this.refreshBounds();
      //this.refreshPadding();
      //this.refreshMargin();
      // 如果父容器是可以容纳控件的，则将自己添加到父容器
      //if(MO.Class.isClass(o.parent, MContainer)){
      //   o.parent.appendChild(o);
      //}
   }

   //==========================================================
   // <T>判断当前控件是否显示。</T>
   //
   // @return 是否显示
   //==========================================================
   public isVisible() {
      return this._statusVisible;
   }

   //==========================================================
   // <T>设置控件的隐藏和显示。</T>
   //
   // @param visible 是否显示
   //==========================================================
   public setVisible(visible: boolean) {
      var hPanel = this._hPanel;
      if (hPanel) {
         HtmlUtil.visibleSet(hPanel, visible);
      }
      this._statusVisible = visible;
   }

   //==========================================================
   // <T>显示状态切换。</T>
   //==========================================================
   public show() {
      if (!this._statusVisible) {
         this.setVisible(true);
      }
   }

   //==========================================================
   // <T>隐藏状态切换。</T>
   //==========================================================
   public hide() {
      if (this._statusVisible) {
         this.setVisible(false);
      }
   }

   //==========================================================
   // <T>判断当前控件是否可以操作。</T>
   //
   // @return 是否可以
   //==========================================================
   public isEnable() {
      return this._statusEnable;
   }

   //==========================================================
   // <T>设置控件的可操作和禁止。</T>
   //
   // @param enable 是否可操作
   //==========================================================
   public setEnable(enable) {
      var hPanel = this._hPanel;
      if (hPanel) {
         hPanel.style.disabled = !enable;
      }
      this._statusEnable = enable;
   }

   //==========================================================
   // <T>可操作状态切换。</T>
   //==========================================================
   public enable() {
      if (!this._statusEnable) {
         this.setEnable(true);
      }
   }

   //==========================================================
   // <T>禁止状态切换。</T>
   //==========================================================
   public disable() {
      if (this._statusEnable) {
         this.setEnable(false);
      }
   }

   //==========================================================
   // <T>获得定义的样式名称。</T>
   // <P>样式不存在的话，产生例外。</P>
   //
   // @param name 名称
   // @param method 类对象
   // @return String 样式名称
   //==========================================================
   public styleName(name, method?: any) {
      return name;
      // var findMethod = method ? method : this;
      // var className = ClassUtil.name(findMethod);
      // var clazz = ClassUtil.forName(className);
      // return clazz.style(name);
   }

   //==========================================================
   // <T>获得定义的样式图标名称。</T>
   //
   // @param name:String 名称
   // @param method:Function 类对象
   // @return String 图标名称
   //==========================================================
   public styleIcon(name, method) {
      //var className = MO.Class.name(method ? method : this, true);
      //return className + '_' + name;
   }

   //==========================================================
   // <T>获得定义的样式图标路径。</T>
   //
   // @param name:String 名称
   // @param method:Function 类对象
   // @return String 图标路径
   //==========================================================
   public styleIconPath(name, method) {
      //var className = MO.Class.name(method ? method : this, true);
      //var iconName = className + '_' + name;
      //return MO.RResource.iconPath(iconName);
   }

   //==========================================================
   // <T>设置控件的页面父容器。</T>
   //
   // @param hPanel 页面元素
   //==========================================================
   public setPanel(hPanel) {
      this._hParent = hPanel;
      hPanel.appendChild(this._hPanel);
   }

   //==========================================================
   // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   //    该立即函数的this指针指向当前控件实例。</P>
   // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   //    执行时该函数的this指针指向当前控件实例。</P>
   //
   // @param name 注册过的事件名称
   // @param hTag 页面元素
   // @param method 立即函数
   // @param capture 捕捉
   // @return TEvent 关联的事件对象
   //==========================================================
   public attachEvent(hTag: any, eventCd: string, method: Function = null, capture: boolean = false) {
      var eventService: EventService = ServiceUtil.find(EventService);
      eventService.attachEvent(this, hTag, eventCd, method, capture);
   }

   //==========================================================
   // <T>构建处理。</T>
   // <P>只允许构建一次，不允许重复构建。</P>
   //
   // @param parent 父对象
   //==========================================================
   public build(parent: any) {
      AssertUtil.debugTrue(this._statusBuild);
      // 获得文档对象
      var hDocument = null;
      if (parent instanceof Control) {
         hDocument = parent._hPanel.ownerDocument;
      } else if (parent.createElement) {
         hDocument = parent;
      } else if (parent.ownerDocument && parent.ownerDocument.createElement) {
         hDocument = parent.ownerDocument;
      } else if (parent.hDocument) {
         hDocument = parent.hDocument;
      } else {
         throw new Fatal(this, "Parent is invalid. (parent={1})", parent);
      }
      // 构建处理
      var event: any = new Event(this);
      event.hDocument = hDocument;
      this.onBuild(event);
      event.dispose();
      // 设置状态
      this._statusBuild = true;
   }

   // //==========================================================
   // // <T>当该控件获得热点时的处理</T>
   // //
   // // @method
   // // @param e:event:TEvent 事件对象
   // //==========================================================
   // public onEnter(e) {
   //    // MO.Console.find(MO.FDuiFocusConsole).enter(this);
   //    // if (this._hint) {
   //    //    MO.RWindow.setStatus(this._hint);
   //    // }
   // }

   // //==========================================================
   // // <T>当该控件失去热点时的处理</T>
   // //
   // // @method
   // // @param e:event:TEvent 事件对象
   // //==========================================================
   // public onLeave(e) {
   //    // MO.Console.find(MO.FDuiFocusConsole).leave(this);
   //    // if (this._hint) {
   //    //    MO.RWindow.setStatus();
   //    // }
   // }

   // //==========================================================
   // // <T>控件模式变更处理。</T>
   // //
   // // @method
   // // @param event:SUiDispatchEvent 事件信息
   // // @return EEventStatus 处理状态
   // //==========================================================
   // public oeMode(event) {
   //    // this._modeCd = event.modeCd;
   //    // return MO.EEventStatus.Continue;
   // }

   // //==========================================================
   // // <T>获得指定类型的父控件。</T>
   // //
   // // @method
   // // @param c:class:Class 类
   // // @return FDuiControl 父控件
   // //==========================================================
   // public topControl(c) {
   //    var r = this;
   //    if (c) {
   //       while (r._parent) {
   //          if (MO.Class.isClass(r._parent, c)) {
   //             return r._parent;
   //          }
   //          r = r._parent;
   //       }
   //       if (!MO.Class.isClass(r, c)) {
   //          return null;
   //       }
   //    } else {
   //       while (r._parent) {
   //          if (!MO.Class.isClass(r._parent, FDuiControl)) {
   //             break;
   //          }
   //          r = r._parent;
   //       }
   //    }
   //    return r;
   // }

   // //==========================================================
   // // <T>根据底板类型得到相应的页面元素。</T>
   // //
   // // @method
   // // @param p:value:EPanel 底板类型
   // // @return HtmlTag 页面元素
   // //==========================================================
   // public panel(p) {
   //    var o = this;
   //    switch (p) {
   //       case MO.EPanel.Parent:
   //          return o._hParent;
   //       case MO.EPanel.Container:
   //       case MO.EPanel.Size:
   //          return o._hPanel;
   //    }
   //    return null;
   // }

   // //==========================================================
   // // <T>设置填充空白。</T>
   // //
   // // @method
   // // @param left:Integer 左空白
   // // @param top:Integer 上空白
   // // @param right:Integer 右空白
   // // @param bottom:Integer 下空白
   // //==========================================================
   // public setMargin(left, top, right, bottom) {
   //    var o = this;
   //    var padding = o._padding;
   //    var hPanel = o.panel(MO.EPanel.Container);
   //    // 获得样式
   //    var hStyle = null;
   //    if (hPanel && !hPanel.__fragment) {
   //       hStyle = hPanel.style;
   //    }
   //    // 设置左空白
   //    if (left != null) {
   //       padding.left = left;
   //       if (hStyle) {
   //          hStyle.marginLeft = (left == 0) ? null : left + 'px';
   //       }
   //    }
   //    // 设置上空白
   //    if (top != null) {
   //       padding.top = top;
   //       if (hStyle) {
   //          hStyle.marginTop = (top == 0) ? null : top + 'px';
   //       }
   //    }
   //    // 设置右空白
   //    if (right != null) {
   //       padding.right = right;
   //       if (hStyle) {
   //          hStyle.marginRight = (right == 0) ? null : right + 'px';
   //       }
   //    }
   //    // 设置下空白
   //    if (bottom != null) {
   //       padding.bottom = bottom;
   //       if (hStyle) {
   //          hStyle.marginBottom = (bottom == 0) ? null : bottom + 'px';
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>刷新填充空白。</T>
   // //
   // // @method
   // //==========================================================
   // public refreshMargin() {
   //    var o = this;
   //    var p = o._margin;
   //    o.setMargin(p.left, p.top, p.right, p.bottom);
   // }

   // //==========================================================
   // // <T>设置填充空白。</T>
   // //
   // // @method
   // // @param left:Integer 左空白
   // // @param top:Integer 上空白
   // // @param right:Integer 右空白
   // // @param bottom:Integer 下空白
   // //==========================================================
   // public setPadding(left, top, right, bottom) {
   //    var o = this;
   //    var padding = o._padding;
   //    var hPanel = o.panel(MO.EPanel.Container);
   //    // 获得样式
   //    var hStyle = null;
   //    if (hPanel && !hPanel.__fragment) {
   //       hStyle = hPanel.style;
   //    }
   //    // 设置左空白
   //    if (left != null) {
   //       padding.left = left;
   //       if (hStyle) {
   //          hStyle.paddingLeft = (left == 0) ? null : left + 'px';
   //       }
   //    }
   //    // 设置上空白
   //    if (top != null) {
   //       padding.top = top;
   //       if (hStyle) {
   //          hStyle.paddingTop = (top == 0) ? null : top + 'px';
   //       }
   //    }
   //    // 设置右空白
   //    if (right != null) {
   //       padding.right = right;
   //       if (hStyle) {
   //          hStyle.paddingRight = (right == 0) ? null : right + 'px';
   //       }
   //    }
   //    // 设置下空白
   //    if (bottom != null) {
   //       padding.bottom = bottom;
   //       if (hStyle) {
   //          hStyle.paddingBottom = (bottom == 0) ? null : bottom + 'px';
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>刷新填充空白。</T>
   // //
   // // @method
   // //==========================================================
   // public refreshPadding() {
   //    var o = this;
   //    var p = o._padding;
   //    o.setPadding(p.left, p.top, p.right, p.bottom);
   // }

   // //==========================================================
   // // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   // //    该立即函数的this指针指向当前控件实例。</P>
   // // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   // //    执行时该函数的this指针指向当前控件实例。</P>
   // //
   // // @method
   // // @param name:String 注册过的事件名称
   // // @param hTag:HtmlTag 页面元素
   // // @param method:Function 立即函数
   // // @param capture:Boolean 捕捉
   // // @return TEvent 关联的事件对象
   // //==========================================================
   // public attachEvent(name, hTag, method, capture) {
   //    return MO.Dui.Control.attachEvent(this, name, hTag, method, capture);
   // }

   // //==========================================================
   // // <T>将一个页面元素和已经注册过的事件相关联。</T>
   // // <P>如果指定了立即函数，则发生事件时，会立即执行立即函数。
   // //    该立即函数的this指针指向到达者控件实例。
   // //    可以通过事件对象的发出者访问到该发出对象。</P>
   // // <P>如果存在注册过的队列函数，则发生事件时，该事件被排到队列中等待执行。
   // //    执行时该函数的this指针指向到达者控件实例。
   // //    可以通过事件对象的发出者访问到该发出对象。</P>
   // //
   // // @method
   // // @param control:FDuiControl 控件
   // // @param name:String 注册过的事件名称
   // // @param hTag:HtmlTag 页面元素
   // // @param method:Function 立即函数
   // // @param capture:Boolean 是否捕捉
   // // @return TEvent 关联的事件对象
   // //==========================================================
   // public linkEvent(control, name, hTag, method, capture) {
   //    return MO.Dui.Control.linkEvent(this, control, name, hTag, method, capture);
   // }

   // //==========================================================
   // // <T>调用控件的关联事件。</T>
   // //
   // // @method
   // // @param name:String 事件名称
   // // @param source:FDuiControl 事件源
   // // @param event:TEvent 事件对象
   // //==========================================================
   // public callEvent(name, source, event) {
   //    var o = this;
   //    var es = o._events;
   //    if (es) {
   //       var ec = es.get(name);
   //       if (ec) {
   //          ec.invoke(source, source, event);
   //       }
   //    }
   // }

   // //==========================================================
   // // <T>判断是否已经构建。</T>
   // //
   // // @method
   // // @return Boolean 是否构建
   // //==========================================================
   // public isBuild() {
   //    return this._statusBuild;
   // }

   // //==========================================================
   // // <T>构建完成处理。</T>
   // //
   // // @method
   // // @param p:html:HtmlTag 页面元素
   // //==========================================================
   // public builded(p) {
   //    var o = this;
   //    // 检查状态
   //    if (!o._statusBuild) {
   //       throw new MO.TError(o, 'Current control is not build.');
   //    }
   //    // 检查完成状态
   //    if (o._statusBuilded) {
   //       throw new MO.TError(o, 'Current control is already builded.');
   //    }
   //    // 构建完成处理
   //    o.onBuilded(p);
   //    // 设置状态
   //    o._statusBuilded = true;
   // }

   // //==========================================================
   // // <T>刷新处理。</T>
   // // <P>构件后，重新加载内容时，需要刷新处理。</P>
   // //
   // // @method
   // //==========================================================
   // public refresh() {
   //    var o = this;
   //    // 检查状态
   //    if (!o._statusBuild) {
   //       throw new MO.TError(o, 'Current control is not build.');
   //    }
   // }

   // //==========================================================
   // // <T>释放处理。</T>
   // //
   // // @method
   // //==========================================================
   // public dispose() {
   //    var o = this;
   //    // 释放属性
   //    o._disable = null;
   //    o._hint = null;
   //    // 释放属性
   //    o._styleContainer = null;
   //    // 释放属性
   //    o._statusVisible = null;
   //    o._statusEnable = null;
   //    o._statusBuild = null;
   //    // 释放属性
   //    o._hParent = null;
   //    o._hPanel = MO.Window.Html.free(o._hPanel);
   //    // 释放处理
   //    o.__base.MDuiStyle.dispose.call(o);
   //    o.__base.MUiPadding.dispose.call(o);
   //    o.__base.MUiMargin.dispose.call(o);
   //    o.__base.MDuiSize.dispose.call(o);
   //    o.__base.MUiControl.dispose.call(o);
   //    o.__base.FDuiComponent.dispose.call(o);
   // }
}
