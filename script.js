// 导航栏交互
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// 点击导航链接后关闭移动端菜单
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// 滚动时导航栏样式变化
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(251, 251, 253, 0.95)';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(251, 251, 253, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 观察所有需要动画的元素
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(`
        .features-content,
        .design-content,
        .waterproof-content,
        .battery-content,
        .sleep-content,
        .balance-content,
        .monitoring-content,
        .cycle-content,
        .sports-content,
        .recovery-content,
        .family-content,
        .compatibility-content,
        .measurement-content,
        .programmable-content,
        .family-products-content
    `);

    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        observer.observe(el);
    });
});

// 传感器卡片交互
const sensorItems = document.querySelectorAll('.sensor-item');
sensorItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.05)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// 健康数据动画
const statValues = document.querySelectorAll('.stat-value');
const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = start + (end - start) * progress;
        
        if (element.dataset.target.includes('.')) {
            element.textContent = current.toFixed(1);
        } else {
            element.textContent = Math.floor(current);
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        } else {
            element.textContent = element.dataset.target;
        }
    };
    window.requestAnimationFrame(step);
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target;
            const target = parseFloat(statValue.dataset.target);
            animateValue(statValue, 0, target, 2000);
            statsObserver.unobserve(statValue);
        }
    });
}, { threshold: 0.5 });

statValues.forEach(stat => {
    statsObserver.observe(stat);
});

// 圆形进度条动画
const meterProgress = document.querySelector('.meter-progress');
if (meterProgress) {
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.dataset.progress;
                const circumference = 2 * Math.PI * 80; // 半径80
                const offset = circumference - (progress / 100) * circumference;
                entry.target.style.strokeDashoffset = offset;
                progressObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    progressObserver.observe(meterProgress);
}

// 周期追踪圆形进度动画
const cycleProgress = document.querySelector('.cycle-progress');
if (cycleProgress) {
    const cycleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const circumference = 2 * Math.PI * 80;
                const progress = 75; // 75%进度
                const offset = circumference - (progress / 100) * circumference;
                entry.target.style.strokeDasharray = circumference;
                entry.target.style.strokeDashoffset = offset;
                cycleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    cycleObserver.observe(cycleProgress);
}

// 运动图标交互
const sportIcons = document.querySelectorAll('.sport-icon');
sportIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        // 添加点击动画
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1) rotate(10deg)';
        }, 100);
    });
});

// 家庭成员图标交互
const members = document.querySelectorAll('.member');
members.forEach(member => {
    member.addEventListener('click', function() {
        this.style.transform = 'scale(1.2) rotate(360deg)';
        setTimeout(() => {
            this.style.transform = 'scale(1.1)';
        }, 600);
    });
});

// 操作系统Logo交互
const osLogos = document.querySelectorAll('.os-logo');
osLogos.forEach(logo => {
    logo.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.logo-icon');
        icon.style.transform = 'rotate(360deg) scale(1.1)';
        icon.style.transition = 'transform 0.6s ease-out';
    });
    
    logo.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.logo-icon');
        icon.style.transform = 'rotate(0deg) scale(1)';
    });
});

// 戒指变体交互
const ringVariants = document.querySelectorAll('.ring-variant');
ringVariants.forEach(ring => {
    ring.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.15) rotate(15deg)';
        this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
    });
    
    ring.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
        this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.2)';
    });
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 44; // 减去导航栏高度
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// 视差滚动效果
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroVisual = document.querySelector('.hero-visual');
    if (heroVisual) {
        heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroVisual.style.opacity = 1 - scrolled / 500;
    }
});

// 鼠标跟随效果（可选，用于某些元素）
const ringContainer = document.querySelector('.ring-container');
if (ringContainer) {
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        ringContainer.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
    });
}

// 页面加载动画
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease-in';
        document.body.style.opacity = '1';
    }, 100);
});

// 图表动画增强
const chartBars = document.querySelectorAll('.chart-bar');
const chartObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'chartGrow 1s ease-out forwards';
            }, index * 100);
            chartObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

chartBars.forEach(bar => {
    chartObserver.observe(bar);
});

// 代码行打字效果
const codeLines = document.querySelectorAll('.code-line');
const codeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.animation = 'codeType 1s ease-out forwards';
            }, index * 300);
            codeObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

codeLines.forEach(line => {
    codeObserver.observe(line);
});

// 扫描线动画重置
const scanLine = document.querySelector('.scan-line');
if (scanLine) {
    const scanObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'scanMove 2s ease-in-out infinite';
            }
        });
    }, { threshold: 0.5 });
    
    scanObserver.observe(scanLine);
}

// 响应式处理：窗口大小改变时调整
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // 重新计算某些需要响应式的元素
        if (window.innerWidth <= 768) {
            navMenu.classList.remove('active');
        }
    }, 250);
});

// 添加触摸设备支持
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // 为触摸设备优化某些交互
    const interactiveElements = document.querySelectorAll('.sensor-item, .sport-icon, .member, .os-logo, .ring-variant');
    interactiveElements.forEach(el => {
        el.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        el.addEventListener('touchend', function() {
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// 性能优化：使用requestAnimationFrame优化滚动
let ticking = false;

function updateOnScroll() {
    // 滚动相关的更新逻辑
    ticking = false;
}

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// 添加键盘导航支持
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// 懒加载图片（如果有的话）
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src;
    });
} else {
    // 降级方案
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

